use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Paper {
    #[max_len(100)]
    pub authors: String,
    #[max_len(150)]
    pub title: String,
    #[max_len(5000)]
    pub intro: String, //looks like abstract is a reserved word
    pub owner: Pubkey,
    #[max_len(16)]
    pub review_status: String,
    pub price: u16,
    pub bump: u8,
    pub user_bump: u8,
    pub reviews: u32,
    pub sales: u32,
    pub timestamp: i64,
}

// Space Calculation
// 104 + 154 + 5004 + 32+ 20 + 2 + 1 + 1 + 4 + 4 + 8 = 5334 Bytes (Max 10,240 Bytes)
