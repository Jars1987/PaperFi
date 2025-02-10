use anchor_lang::prelude::*;
use crate::state::{ Admin, PaperFiConfig };
use crate::errors::ErrorCode;

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,

    #[account(
        init,
        payer = admin,
        space = 8 + Admin::INIT_SPACE,
        seeds = [b"admin", admin.key().as_ref()],
        bump
    )]
    pub admin_account: Account<'info, Admin>,

    #[account(seeds = [b"admin_vault", admin.key().as_ref()], bump)]
    pub admin_vault: SystemAccount<'info>,

    #[account(
        init_if_needed,
        payer = admin,
        space = PaperFiConfig::INIT_SPACE,
        seeds = [b"paperfi_config"],
        bump
    )]
    pub config: Account<'info, PaperFiConfig>,

    pub system_program: Program<'info, System>,
}

impl<'info> Initialize<'info> {
    pub fn generate_accounts(&mut self, bumps: InitializeBumps) -> Result<()> {
        let config = &mut self.config;

        // Enforce max 3 admins
        require!(config.admins.len() < PaperFiConfig::MAX_ADMINS, ErrorCode::TooManyAdmins);

        // Add new admin if not already present, prevent duplication
        if !config.admins.contains(&self.admin.key()) {
            config.admins.push(self.admin.key());
        }

        self.admin_account.set_inner(Admin {
            owner: self.admin.key(),
            vault: self.admin_vault.key(),
            bump: bumps.admin_account,
            vault_bump: bumps.admin_vault,
            fee: 2, //default valuee is going to be 2%, we might want to implement a feature to change the fee later
        });
        Ok(())
    }
}
