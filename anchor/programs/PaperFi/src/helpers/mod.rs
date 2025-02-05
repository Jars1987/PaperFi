use anchor_lang::prelude::*;
use crate::errors::ErrorCode;

// -------------  Helper functions ---------------
pub fn update_field(field: &mut String, new_value: Option<String>, max_len: usize) -> Result<()> {
    match new_value {
        Some(value) => {
            require!(value.len() < max_len, ErrorCode::InvalidFieldLength);
            require!(!value.is_empty(), ErrorCode::FieldIsEmpty);

            *field = value;
        }
        None => {}
    }
    Ok(())
}

pub fn update_numeric_field<T: Copy>(field: &mut T, new_value: Option<T>) -> Result<()> {
    match new_value {
        Some(value) => {
            *field = value;
        }
        None => {}
    }
    Ok(())
}

// --------------- Helper Structs ------------------

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct EditUserParams {
    pub name: Option<String>,
    pub title: Option<String>,
    pub purchases: Option<u16>,
    pub papers: Option<u16>,
    pub reviews: Option<u16>,
}

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct EditPaperParams {
    pub authors: Option<String>,
    pub title: Option<String>,
    pub intro: Option<String>,
    pub listed: Option<bool>,
    pub price: Option<u16>,
    pub reviews: Option<u32>,
    pub sales: Option<u32>,
    pub version: Option<u32>,
    pub paper_uri: Option<String>,
}

// --------------------- ENUMS ----------------------

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub enum Verdict {
    Approved,
    Rejected,
    ReviewRequested,
}

impl Space for Verdict {
    const INIT_SPACE: usize = 1; // 1 byte is enough for an enum with <= 256 variants
}
