use anchor_lang::prelude::*;

use crate::state::{ User, Paper, Review, ReviewStatus };
use crate::errors::ErrorCode;
use crate::helpers::*;

#[derive(Accounts)]
#[instruction(id: u64)]
pub struct ReviewPaper<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(
      mut,
      seeds = [b"user", signer.key().as_ref()],
      bump
    )]
    pub reviewer_user_account: Account<'info, User>, //to review they must sign up and create an account

    #[account(
      mut, 
      seeds = [b"user", paper.owner.key().as_ref()],
       bump
      )]
    pub user: Account<'info, User>, //paper owner user account

    #[account(
    mut,
    seeds = [b"paper", user.key().as_ref(), &id.to_le_bytes()],
    bump
)]
    pub paper: Account<'info, Paper>,

    #[account(
        init,
        payer = signer,
        space = Review::INIT_SPACE,
        seeds = [b"review", signer.key().as_ref(), paper.key().as_ref()],
        bump
    )]
    pub review: Account<'info, Review>,

    pub system_program: Program<'info, System>,
}

impl<'info> ReviewPaper<'info> {
    //When selecting the paper to review, the client has the PDA info
    pub fn review_paper(&mut self, id: u64, verdict: Verdict, uri: String) -> Result<()> {
        let time = Clock::get()?.unix_timestamp as u64;
        //create review
        self.review.set_inner(Review {
            owner: self.signer.key(),
            paper: self.paper.key(),
            verdict: verdict.clone(),
            timestamp: time.clone(),
            review_uri: uri,
        });

        //update paper state
        let paper = &mut self.paper;
        paper.reviews += 1;
        paper.timestamp = time;
        paper.review_status.update(verdict);

        // Check rejection ratio - set to 20% for now
        if paper.review_status.rejection_ratio() > 0.2 {
            paper.listed = false;
        }

        //update user state
        self.reviewer_user_account.reviews += 1;
        self.reviewer_user_account.timestamp = time;

        Ok(())
    }
}
