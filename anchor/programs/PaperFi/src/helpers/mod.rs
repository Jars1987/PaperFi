use anchor_lang::prelude::*;
use regex::Regex;
use crate::errors::ErrorCode;

//--------------  Macro Rules  -------------------

#[macro_export]
macro_rules! validate_no_emojis {
    ($string:expr) => {
        
        // Emoji regex pattern that matches a wide range of emojis. 
        // For a broader coveraje we might need to get emoji unicode ranges and check if the string falls in those ranges. Still hard to cover all those ranves
        let emoji_pattern = r"[\x{1F600}-\x{1F64F}\x{1F300}-\x{1F5FF}\x{1F680}-\x{1F6FF}\x{1F700}-\x{1F77F}\x{1F780}-\x{1F7FF}\x{1F800}-\x{1F8FF}\x{1F900}-\x{1F9FF}\x{1FA00}-\x{1FA6F}\x{1FA70}-\x{1FAFF}\x{2600}-\x{26FF}\x{2700}-\x{27BF}\x{2300}-\x{23FF}\x{2B50}\x{3030}\x{2B06}\x{2194}\x{1F004}\x{1F0CF}\x{1F171}\x{1F18E}\x{1F191}\x{1F192}\x{1F193}\x{1F194}\x{1F195}\x{1F196}\x{1F197}\x{1F198}\x{1F199}\x{1F19A}\x{1F1E6}-\x{1F1FF}\x{24C2}-\x{1F251}]";
        
        let re = Regex::new(emoji_pattern).unwrap();
        
        if re.is_match($string) {
            return Err(anchor_lang::error!(ErrorCode::EmojisNotAllowed));
        }
    };
}

#[macro_export]
macro_rules! check_user_achievement {
    ($user_account:expr, $name:expr, $record:expr) => {
        match $name.as_str() {
            "papers" => {
                require!(
                    $user_account.papers >= $record,
                    ErrorCode::InvalidAchievement
                );
            }
            "reviews" => {
                require!(
                    $user_account.reviews >= $record,
                    ErrorCode::InvalidAchievement
                );
            }
            "purchases" => {
                require!(
                    $user_account.purchases >= $record,
                    ErrorCode::InvalidAchievement
                );
            }
            _ => {
                return Err(ErrorCode::UnknownBadge.into());
            }
        }
    };
}

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
    pub purchases: Option<u32>,
    pub papers: Option<u32>,
    pub reviews: Option<u32>,
}

#[derive(AnchorDeserialize, AnchorSerialize)]
pub struct CreateBadgeArgs {
    pub name: String,
    pub uri: String,
}

#[derive(AnchorDeserialize, AnchorSerialize)]
pub struct PrintBadgeArgs {
    pub name: String,
    pub uri: String,
    pub achievement: String,
    pub record: u32,
    pub timestamp: u64,
}

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct EditPaperParams {
    pub paper_info_url: Option<String>,
    pub listed: Option<bool>,
    pub price: Option<u64>,
    pub reviews: Option<u32>,
    pub sales: Option<u32>,
    pub version: Option<u32>,
    pub paper_uri: Option<String>,
}

// --------------------- ENUMS ----------------------

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq)]
pub enum Verdict {
    Approved,
    Rejected,
    ReviewRequested,
}

impl Space for Verdict {
    const INIT_SPACE: usize = 1; // 1 byte is enough for an enum with <= 256 variants
}
