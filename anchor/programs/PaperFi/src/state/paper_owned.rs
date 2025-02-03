use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct PaperOwned {
    pub user: Pubkey, // The user who owns the paper
    pub paper: Pubkey, // The paper being owned
    pub timestamp: u64, // Timestamp of ownership
}
