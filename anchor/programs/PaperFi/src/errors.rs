use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Exceeded the field length allowed")]
    InvalidFieldLength,
    #[msg("Must provide a name and a title")]
    FieldIsEmpty,
}
