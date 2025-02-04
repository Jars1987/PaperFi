pub mod constants;
pub mod errors;
pub mod instructions;
pub mod state;
pub mod helpers;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;
pub use helpers::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod PaperFi {
    use super::*;

    pub fn initialize(context: Context<Initialize>) -> Result<()> {
        context.accounts.generate_accounts(context.bumps)?;
        //TODO
        Ok(())
    }

    pub fn signup(context: Context<NewUser>, name: String, title: String) -> Result<()> {
        context.accounts.new_user(name, title, context.bumps)?;
        Ok(())
    }

    pub fn edit_user(context: Context<EditUser>, params: EditUserParams) -> Result<()> {
        edit_user::edit_user(context, params)?;
        Ok(())
    }

    pub fn new_paper(
        context: Context<NewPaper>,
        authors: String,
        title: String,
        intro: String,
        price: u16
    ) -> Result<()> {
        context.accounts.new_paper(authors, title, intro, price, context.bumps)?;
        Ok(())
    }

    /* 
    pub fn edit_paper(context: Context<EditPaper>) -> Result<()> {
        //TODO
        Ok(())
    }

    //Each review has ReviewDoc connected to the PaperDoc (set a racio of approved/Rejected papers to block and delist paper)
    pub fn review_paper(context: Context<ReviewPaper>) -> Result<()> {
        //TODO
        Ok(())
    }

    //Mint NFT Badge
    pub fn mint_badge(context: Context<MintBadge>) -> Result<()> {
        //TODO
        Ok(())
    }

    //Can also be done through edit paper doc, might not be neeeded
    pub fn list_paper(context: Context<ListPaper>) -> Result<()> {
        //TODO
        Ok(())
    }

    //Can also be done through edit paper doc, might not be neeeded
    pub fn delist_paper(context: Context<DelistPaper>) -> Result<()> {
        //TODO
        Ok(())
    }

    //Buy Paper - PaperOwned PDA created, get account from Discriminator and Buyer Publickey, get the file decrypted in the Front End
    pub fn buy_paper(context: Context<BuyPaper>) -> Result<()> {
        //TODO
        Ok(())
    }

    //pub fn withdraw_funds(context: Context<Withdraw>) -> Result<()> {
        //TODO
        Ok(())
    }

    */
}
