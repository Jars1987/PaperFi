use anchor_lang::prelude::*;
use crate::state::User;
use crate::errors::ErrorCode;
use crate::helpers::*;

#[derive(Accounts)]
pub struct EditUser<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,

    #[account(mut, has_one = owner)]
    pub user: Account<'info, User>,
}

pub fn edit_user(ctx: Context<EditUser>, params: EditUserParams) -> Result<()> {
    let user = &mut ctx.accounts.user;

    update_field(&mut user.name, params.name, 49)?;
    update_field(&mut user.title, params.title, 33)?;
    update_numeric_field(&mut user.purchases, params.purchases)?;
    update_numeric_field(&mut user.papers, params.papers);
    update_numeric_field(&mut user.reviews, params.reviews);
    update_numeric_field(&mut user.timestamp, params.timestamp);

    Ok(())
}
