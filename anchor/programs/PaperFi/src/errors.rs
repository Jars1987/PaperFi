use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Exceeded the field length allowed")]
    InvalidFieldLength,
    #[msg("Must provide a name and a title")]
    FieldIsEmpty,
    #[msg("The input string contains emojis, which are not allowed")]
    EmojisNotAllowed,
    #[msg("Something went wrong. Mathoverflow!")]
    MathOverflow,
    #[msg("Vault is empty")]
    InsufficientFunds,
}
