use anchor_lang::prelude::*;
use anchor_lang::system_program::{ transfer, Transfer };
use crate::errors::ErrorCode;

#[derive(Accounts)]
#[instruction(admin_vault_bump: u8)]
pub struct AdminWithdraw<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,

    #[account(mut, seeds = [b"admin_vault", admin.key().as_ref()], bump = admin_vault_bump)]
    pub admin_vault: SystemAccount<'info>,

    pub system_program: Program<'info, System>,
}

impl<'info> AdminWithdraw<'info> {
    pub fn admin_withdraw(&mut self, admin_vault_bump: u8) -> Result<()> {
        let vault_balance = self.admin_vault.lamports();
        require!(vault_balance > 0, ErrorCode::InsufficientFunds);
        let admin_seed = self.admin.key();
        let seeds = &[b"admin_vault", admin_seed.as_ref(), &[admin_vault_bump]];
        let signer_seeds = &[&seeds[..]];

        let cpi_program = self.system_program.to_account_info();
        let cpi_accounts = Transfer {
            from: self.admin_vault.to_account_info(),
            to: self.admin.to_account_info(),
        };
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer_seeds);

        transfer(cpi_ctx, vault_balance)?;

        Ok(())
    }
}
