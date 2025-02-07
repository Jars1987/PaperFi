use anchor_lang::prelude::*;

use crate::state::Admin;

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(
        init,
        payer = admin,
        space = 8 + Admin::INIT_SPACE,
        seeds = [b"admin", admin.key().as_ref()],
        bump
    )]
    pub admin: Account<'info, Admin>,

    #[account(seeds = [b"admin_vault", admin.key().as_ref()], bump)]
    pub admin_vault: SystemAccount<'info>,

    pub system_program: Program<'info, System>,
}

impl<'info> Initialize<'info> {
    pub fn generate_accounts(&mut self, bumps: InitializeBumps) -> Result<()> {
        self.admin.set_inner(Admin {
            owner: self.signer.key(),
            vault: self.admin_vault.key(),
            bump: bumps.admin,
            vault_bump: bumps.admin_vault,
            fee: 2, //default vaule is going to be 2%, we might want to implement a feature to change the fee later
        });
        Ok(())
    }
}
