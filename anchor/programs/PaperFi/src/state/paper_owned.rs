use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct PaperOwned {
    pub buyer: Pubkey, // The user who bought a copy of the paper
    pub paper: Pubkey, // The paper address of the paper being bought
    pub timestamp: u64, // Timestamp of ownership
    pub bump: u8,
}

/*
Explanation

1- With this PaperOwned account created at the time of purchase we are creating an onchain stamp of purchase.
2- With this, when working off chain in the backend of the app we will be able to get the all the accoutnts that exist in the program with getProgramAccounts
And we will be able to filter those accounts with by the descriminator of paperowned (get that from idl or a log) and by the buyer (user account) pubkey.
3- We will get an array with all the paperowned accounts that were created by a given user (everytime the user makes a purchase creates an account)
4- in the dashboard we can list all the papers the user has.
5- Also it works as proof of buying the paper and they can get the decoded link to download.

*/
