use anchor_lang::prelude::*;

#[account]
pub struct PaperFiConfig {
    pub admins: Vec<Pubkey>, // Max 3 admins
    pub bump: u8, // For PDA derivation
}

impl PaperFiConfig {
    pub const MAX_ADMINS: usize = 3;
    pub const INIT_SPACE: usize = 8 + Self::MAX_ADMINS * 32 + 1; // 8 (discriminator) + 3 * pubkey (32) + 1 bump
}
