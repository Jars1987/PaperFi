use anchor_lang::prelude::*;
use anchor_lang::system_program::{ transfer, Transfer };
use crate::state::{ Paper, UserAccount, PaperOwned, Admin };
use crate::errors::ErrorCode;

#[derive(Accounts)]
#[instruction(id: u64)]
pub struct BuyPaper<'info> {
    #[account(mut)]
    pub buyer: Signer<'info>,

    #[account(
      mut,
      seeds = [b"user", buyer.key().as_ref()],
      bump = buyer_user_account.bump
    )]
    pub buyer_user_account: Account<'info, UserAccount>, //already init, to use the platform must signup there fore user already exists

    #[account(mut, seeds = [b"user", paper.owner.key().as_ref()], bump = user_account.bump)]
    pub user_account: Account<'info, UserAccount>,

    #[account(seeds = [b"user_vault", paper.owner.key().as_ref()], bump)]
    pub user_vault: SystemAccount<'info>,

    #[account(seeds = [b"admin", admin.owner.key().as_ref()], bump)]
    pub admin: Account<'info, Admin>,

    #[account(seeds = [b"admin_vault", admin.key().as_ref()], bump)] //do I need the vault account?
    pub admin_vault: SystemAccount<'info>,

    #[account(
      mut,
        seeds = [b"paper", paper.owner.key().as_ref(), &id.to_le_bytes()], // ** Check foot notes
        bump
    )]
    pub paper: Account<'info, Paper>,

    #[account(
        init,
        payer = buyer,
        space = PaperOwned::INIT_SPACE,
        seeds = [b"purchase", buyer.key().as_ref(), paper.key().as_ref()],
        bump
    )]
    pub paper_owned: Account<'info, PaperOwned>,

    pub system_program: Program<'info, System>,
}

impl<'info> BuyPaper<'info> {
    pub fn buy_paper(&mut self, bumps: &BuyPaperBumps) -> Result<()> {
        //create PaperOwned
        self.paper_owned.set_inner(PaperOwned {
            buyer: self.buyer.key(),
            paper: self.paper.key(),
            timestamp: Clock::get()?.unix_timestamp as u64,
            bump: bumps.paper_owned,
        });

        //Transfer paper price amount from buyer to user vault
        if self.paper.price > 0 {
            let cpi_program = self.system_program.to_account_info();
            let cpi_accounts = Transfer {
                from: self.buyer.to_account_info().clone(),
                to: self.user_vault.to_account_info(),
            };

            let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);

            //need to make sure that price is u64 and in lamports
            transfer(cpi_ctx, self.paper.price)?;

            //Calculate price of fees and transfer fee from buyer to admin vault
            let total_amout = self.paper.price
                .checked_mul(100u64 + (self.admin.fee as u64))
                .ok_or(ErrorCode::MathOverflow)?;

            let fee_amout = total_amout.checked_div(100).ok_or(ErrorCode::MathOverflow)?;

            let cpi_accounts_2 = Transfer {
                from: self.buyer.to_account_info(),
                to: self.admin_vault.to_account_info(),
            };

            let cpi_ctx_2 = CpiContext::new(self.system_program.to_account_info(), cpi_accounts_2);
            transfer(cpi_ctx_2, fee_amout)?;
        }

        //register sales in the paper state

        self.paper.sales += 1;

        //register purchase in the buyer user_account state
        self.buyer_user_account.purchases += 1;

        Ok(())
    }
}
