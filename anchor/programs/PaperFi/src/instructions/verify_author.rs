use anchor_lang::prelude::*;

use crate::state::{ Paper, PaperAuthor };
use crate::errors::ErrorCode;

#[derive(Accounts)]
#[instruction(id: u64)]
pub struct VerifyAuthor<'info> {
    #[account(mut)]
    pub author: Signer<'info>,

    #[account(seeds = [b"paper", paper.owner.as_ref(), &id.to_le_bytes()], bump = paper.bump)]
    pub paper: Account<'info, Paper>,

    #[account(
        mut,
        seeds = [b"author", author.key().as_ref(), paper.key().as_ref()],
        bump
    )]
    pub paper_author: Account<'info, PaperAuthor>,

    pub system_program: Program<'info, System>,
}

impl<'info> VerifyAuthor<'info> {
    pub fn verify_author(&mut self, id: u64) -> Result<()> {
        if !self.paper_author.verify {
            self.paper_author.verify = true;
        }
        Ok(())
    }
}
