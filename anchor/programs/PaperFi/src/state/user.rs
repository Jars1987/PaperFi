use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct User {
    #[max_len(48)]
    pub name: String,
    #[max_len(32)]
    pub title: String,
    pub purchases: u16,
    pub papers: u16, //published
    pub reviews: u16,
    pub owner: Pubkey,
    pub vault: Pubkey,
    pub bump: u8,
    pub vault_bump: u8,
    pub timestamp: u64,
    // [max_len(48)]
    // institution: String,
}

/*
//COONECTING PAPERS BOUGH WITH USERS BY PDAS:

STATE PDA

#[account]
#[derive(InitSpace)]
pub struct PaperOwned {
    pub user: Pubkey,       // The user who owns the paper
    pub paper: Pubkey,      // The paper being owned
    pub timestamp: u64,     // Timestamp of ownership
}


//When a user purchases or publishes a paper, we create a PaperOwned PDA account. 
//The PDA can be derived using a combination of the user's public key and the paper's public key as seeds.

Front end:
//retrieve all papers owned by a user. Query the PaperOwned accounts using the user's public key as a filter.

//ANCHOR PROGRAM
let discriminator = anchor_lang::sighash("account:PaperOwned");
msg!("PaperOwned Discriminator: {:?}", PaperOwned::DISCRIMINATOR);

//Or get Discriminator from the IDL

//FRONT END
async function getPapersOwnedByUser(userPubkey) {

    const descriminator = bs58.encode(Buffer.from(/* Your 8-byte discriminator */));

    const filters = [
    {
        memcmp: {
            offset: 0, // First 8 bytes are the discriminator
            bytes: discriminator,
        },
    },
    {
        memcmp: {
            offset: 8, // User's Pubkey follows the discriminator
            bytes: userPubkey.toBase58(),
        },
    },
];

    const accounts = await connection.getProgramAccounts(programId, {
        filters,
    });

    return accounts.map((account) => {
        const data = PaperOwned.decode(account.account.data); // Decode data
        return {
            paper: new PublicKey(data.paper), // The paper's public key
            timestamp: data.timestamp, // Ownership timestamp
        };
    });
}

 */
