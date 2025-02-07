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

    // TODO - make sure we are using a pda to create admin accounts we need to make sure only the program creates vaults, accounts and moves funds

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
        id: u64,
        authors: String,
        title: String,
        intro: String,
        price: u64,
        uri: String
    ) -> Result<()> {
        context.accounts.new_paper(id, authors, title, intro, price, uri, &context.bumps)?;
        Ok(())
    }

    pub fn edit_paper(context: Context<EditPaper>, id: u64, params: EditPaperParams) -> Result<()> {
        context.accounts.edit_paper(id, params)?;
        Ok(())
    }

    pub fn review_paper(
        context: Context<ReviewPaper>,
        id: u64,
        verdict: Verdict,
        uri: String
    ) -> Result<()> {
        context.accounts.review_paper(id, verdict, uri)?;
        Ok(())
    }

    /*
    1 - Update Diagrams acording to new changes in code. Introduction of URI, State changes, ID passed in instructions to allow unique papers
      - use bumps stored in states when deriving accounts in the context
      - check if seeds make sense
      - Use uncheked accoutns or SystemAccount when having 2 accounts (user owner of the paper and user owner of the review)
    2-  edit review as the reviewer might want to change is review.

    3-  //Buy Paper - PaperOwned PDA created, get account from Discriminator and Buyer Publickey, get the file decrypted in the Front End
    pub fn buy_paper(context: Context<BuyPaper>) -> Result<()> {
        //TODO
        Ok(())
    }

      //pub fn withdraw_funds(context: Context<Withdraw>) -> Result<()> {
        //TODO
        Ok(())
    }

    //Mint NFT Badge
    pub fn mint_badge(context: Context<MintBadge>) -> Result<()> {
        //TODO
        Ok(())
    }

    */
}

/* ------------------ FUTURE IMPLEMENTATIONS --------------------------

- Should we make the review mandatory before listing like any other ResearchHub?
- Consider if a Paper is rejected how will we notify those that already bought
- Consider that if a paper is requested to be reviewed/changed how will notify the current paper owners to re-download and check changes.
- Consider changing the Paper State to include Paper Changes Log. (maybe doing this off chain)


- Mint an SPL to work as the Token for the Platform
- Everyone is given 1 Token for free when Signing Up
- Reviewers are rewarded with SPL Tokens
- Tokens will have a Pool but can also be used to Purchase Papers
- Tokens can be spend to use additional features (Hire someone specifically to review Paper, Job Posting, Fund raising)
- Implement a Token Swap in the platform
- Allow research centers/institutions to launch IDOs (decentralized ICOs).
*/
