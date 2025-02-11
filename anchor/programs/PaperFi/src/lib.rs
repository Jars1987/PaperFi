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
        paper_info_url: String,
        price: u64,
        uri: String
    ) -> Result<()> {
        context.accounts.new_paper(id, paper_info_url, price, uri, &context.bumps)?;
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

    pub fn edit_review(context: Context<EditReview>, id: u64, verdict: Verdict) -> Result<()> {
        context.accounts.edit_review(id, verdict)?;
        Ok(())
    }

    //Buy Paper - PaperOwned PDA created, get account from Discriminator and Buyer Publickey, get the file decrypted in the Front End
    pub fn buy_paper(context: Context<BuyPaper>) -> Result<()> {
        context.accounts.buy_paper(&context.bumps)?;
        Ok(())
    }

    pub fn user_withdraw(context: Context<UserWithdraw>, vault_bump: u8) -> Result<()> {
        context.accounts.user_withdraw(vault_bump)?;
        Ok(())
    }

    pub fn admin_withdraw(context: Context<AdminWithdraw>) -> Result<()> {
        context.accounts.admin_withdraw()?;
        Ok(())
    }

    //1- First create a collection asset and add Master Edition Plugin
    pub fn make_badge(context: Context<MakeBadge>, args: CreateBadgeArgs) -> Result<()> {
        context.accounts.make_badge(args)?;
        Ok(())
    }

    //2- Second create an NFT asset and add the Edition Plugin
    pub fn mint_achievement_nft(context: Context<PrintBadge>, args: PrintBadgeArgs) -> Result<()> {
        context.accounts.print_badge(args)?;
        Ok(())
    }
}

/* ------------------ Next Steps -------------------------
    // Add Safeguards to all instruction
    //Happy test and Unhappy test

Considerations:
- Verify Badges needs to be done in the client --> https://developers.metaplex.com/core/plugins/verified-creators
- Should we make the review mandatory before listing like any other ResearchHub?
- Consider if a Paper is rejected how will we notify those that already bought
- Consider that if a paper is requested to be reviewed/changed how will notify the current paper owners to re-download and check changes.
- Consider changing the Paper State to include Paper Changes Log. (maybe doing this off chain)

Next Features:
- Paper sales shared with Co-authors pubkeys
- Mint an SPL to work as the Token for the Platform
- Everyone is given 1 Token for free when Signing Up
- Reviewers are rewarded with SPL Tokens
- Tokens will have a Pool but can also be used to Purchase Papers
- Tokens can be spent on additional features (Hire someone specifically to review Paper, Job Posting, Fund raising)
- Implement a Token Swap in the platform
- Allow research centers/institutions to launch IDOs (decentralized ICOs).
*/
