use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Admin {
    pub owner: Pubkey,
    pub vault: Pubkey,
    pub bump: u8,
    pub vault_bump: u8,
    pub fee: u8, //should I change this to u64? use 10000 basis points?
}
