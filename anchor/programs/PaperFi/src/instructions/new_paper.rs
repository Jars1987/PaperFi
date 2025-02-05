use anchor_lang::prelude::*;

use crate::state::{ Paper, User, ReviewStatus };
use crate::errors::ErrorCode;

#[derive(Accounts)]
#[instruction(id: u64)]
pub struct NewPaper<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,

    #[account(seeds = [b"user", owner.key().as_ref()], bump)]
    pub user: Account<'info, User>,

    #[account(
        init,
        payer = owner,
        space = Paper::INIT_SPACE,
        seeds = [b"paper", user.key().as_ref(), &id.to_le_bytes()],
        bump
    )]
    pub paper: Account<'info, Paper>,

    pub system_program: Program<'info, System>,
}

impl<'info> NewPaper<'info> {
    pub fn new_paper(
        &mut self,
        id: u64,
        authors: String,
        title: String,
        intro: String,
        price: u16,
        uri: String,
        bump: NewPaperBumps
    ) -> Result<()> {
        //SafeGuards for max length of Strings, price >= 0
        // TODO

        //default eview status
        let review_status = ReviewStatus {
            approved: 0,
            rejected: 0,
            review_requested: 0,
        };
        //set paper
        self.paper.set_inner(Paper {
            authors,
            title,
            intro,
            owner: self.user.key(),
            review_status,
            version: 1,
            listed: true, //Should it be listed before review? to differentiate?
            price,
            bump: bump.paper,
            user_bump: bump.user,
            reviews: 0,
            sales: 0,
            timestamp: Clock::get().unwrap().unix_timestamp as u64,
            paper_uri: uri,
        });
        Ok(())
    }
}
