use anchor_lang::prelude::*;
use crate::helpers::Verdict;
#[account]
pub struct Paper {
    pub authors: String,
    pub title: String,
    pub intro: String, //looks like abstract is a reserved word
    pub version: u32,
    pub owner: Pubkey,
    pub listed: bool,
    pub price: u16,
    pub bump: u8,
    pub user_bump: u8,
    pub reviews: u32,
    pub review_status: ReviewStatus,
    pub sales: u32,
    pub timestamp: u64,
    pub paper_uri: String,
}

impl Space for Paper {
    const INIT_SPACE: usize =
        8 + // Anchor discriminator
        (100 + 4) + // authors (max 100 chars + prefix)
        (150 + 4) + // title (max 150 chars + prefix)
        (5000 + 4) + // intro (max 5000 chars + prefix)
        4 + // version (u32)
        32 + // owner (Pubkey)
        1 + // listed (bool)
        2 + // price (u16)
        1 + // bump (u8)
        1 + // user_bump (u8)
        4 + // reviews (u32)
        ReviewStatus::INIT_SPACE + // review_status struct
        4 + // sales (u32)
        8 + // timestamp (u64)
        (200 + 4); //URI (max 200 chars + prefix)
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Default)]
pub struct ReviewStatus {
    pub approved: u32,
    pub rejected: u32,
    pub review_requested: u32,
}

impl anchor_lang::Space for ReviewStatus {
    const INIT_SPACE: usize = 4 * 3; // Three u32 fields (each 4 bytes)
}

impl ReviewStatus {
    pub fn update(&mut self, verdict: Verdict) {
        match verdict {
            Verdict::Approved => {
                self.approved += 1;
            }
            Verdict::Rejected => {
                self.rejected += 1;
            }
            Verdict::ReviewRequested => {
                self.review_requested += 1;
            }
        }
    }

    //should I had "Review Requested" too?
    pub fn rejection_ratio(&self) -> f32 {
        if self.rejected + self.approved == 0 {
            0.0
        } else {
            (self.rejected as f32) / ((self.rejected + self.approved) as f32)
        }
    }
}
