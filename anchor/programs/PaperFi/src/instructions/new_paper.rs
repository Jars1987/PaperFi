use anchor_lang::prelude::*;

use crate::state::{ Paper, User };
use crate::errors::ErrorCode;

#[derive(Accounts)]
pub struct NewPaper<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,

    #[account(has_one = owner, seeds = [b"user", owner.key().as_ref()], bump)]
    pub user: Account<'info, User>,

    #[account(
        init,
        payer = owner,
        space = 8 + Paper::INIT_SPACE,
        seeds = [b"paper", user.key().as_ref(), owner.key().as_ref()],
        bump
    )]
    pub paper: Account<'info, Paper>,

    pub system_program: Program<'info, System>,
}

impl<'info> NewPaper<'info> {
    pub fn new_paper(
        &mut self,
        authors: String,
        title: String,
        intro: String,
        price: u16,
        bump: NewPaperBumps
    ) -> Result<()> {
        self.paper.set_inner(Paper {
            authors,
            title,
            intro,
            owner: self.user.key(),
            review_status: "Pending".to_string(),
            price,
            bump: bump.paper,
            user_bump: bump.user,
            reviews: 0,
            sales: 0,
            timestamp: Clock::get().unwrap().unix_timestamp,
        });
        Ok(())
    }
}
