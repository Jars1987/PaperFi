import * as anchor from '@coral-xyz/anchor';
import { BN, Program } from '@coral-xyz/anchor';
import { Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { PaperFi } from '../target/types/PaperFi';
import { before, it } from 'mocha';
import { confirmTransaction, makeKeypairs } from '@solana-developers/helpers';
import { randomBytes } from 'node:crypto';
import { assert } from 'chai';

const programId = new PublicKey('D1WxxPdrGKZym4rBRHz6A18JPqPVRUeHKnvBbj1b7oac');

describe('PaperFi', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const connection = provider.connection;
  const payer = provider.wallet as anchor.Wallet;

  const program = anchor.workspace.PaperFi as Program<PaperFi>;

  //Create admin keypair
  const admin = Keypair.generate();
  //Create User (publisher) keypair
  const bob = Keypair.generate();
  //Create User (bad reviewer) keypair
  const karen = Keypair.generate();
  //Create User(good reviwer) Keypair
  const bond = Keypair.generate();

  //create a random id for the paper
  const id = new BN(randomBytes(8));

  before('Preparing enviorement for testing:', async () => {
    console.log('--------- Airdroping Lamports ----------');

    //airdrop  Admin
    let tx1 = await provider.connection.requestAirdrop(
      admin.publicKey,
      2 * LAMPORTS_PER_SOL
    );
    await confirmTransaction(connection, tx1, 'confirmed');

    //airdrop Bob
    let tx2 = await provider.connection.requestAirdrop(
      bob.publicKey,
      2 * LAMPORTS_PER_SOL
    );
    await confirmTransaction(connection, tx2, 'confirmed');

    //airdrop Karen
    let tx3 = await provider.connection.requestAirdrop(
      karen.publicKey,
      2 * LAMPORTS_PER_SOL
    );
    await confirmTransaction(connection, tx3, 'confirmed');

    //airdrop Bond
    let tx4 = await provider.connection.requestAirdrop(
      bond.publicKey,
      2 * LAMPORTS_PER_SOL
    );
    await confirmTransaction(connection, tx4, 'confirmed');
  });

  //------------------- Initialize PaperFi tests --------------------
  it('Initialize PaperFi and admin account', async () => {
    console.log('------- Initializing Paperfi ------------');
    try {
      const initilializeIx = await program.methods
        .initialize()
        .accountsPartial({
          admin: admin.publicKey,
        })
        .instruction();

      const blockhashContext = await connection.getLatestBlockhash();

      const tx = new anchor.web3.Transaction({
        feePayer: admin.publicKey,
        blockhash: blockhashContext.blockhash,
        lastValidBlockHeight: blockhashContext.lastValidBlockHeight,
      }).add(initilializeIx);

      const signature = await anchor.web3.sendAndConfirmTransaction(
        connection,
        tx,
        [admin]
      );

      console.log(`Signature: ${signature}`);
    } catch {
      assert.fail('Failed to initialize PaperFi');
    }

    //Test if accounts exist
    //derive the config PDA address
    const [configAccountAdress, _] = await PublicKey.findProgramAddressSync(
      [Buffer.from('paperfi_config')],
      programId
    );

    // Fetch the current config account
    const configAccount = await program.account.paperFiConfig.fetch(
      configAccountAdress
    );
    //Get PaperFi Config PDA and assert the Vec<Admin> contains admin.publickey
    assert.isTrue(configAccount.admins.includes(admin.publicKey));
  });

  it('Attempt to re-Initialize PaperFi and admin account', async () => {
    try {
      const initilializeIx = await program.methods
        .initialize()
        .accountsPartial({
          admin: admin.publicKey,
        })
        .instruction();

      const blockhashContext = await connection.getLatestBlockhash();

      const tx = new anchor.web3.Transaction({
        feePayer: admin.publicKey,
        blockhash: blockhashContext.blockhash,
        lastValidBlockHeight: blockhashContext.lastValidBlockHeight,
      }).add(initilializeIx);

      const signature = await anchor.web3.sendAndConfirmTransaction(
        connection,
        tx,
        [admin]
      );

      console.log(`Signature: ${signature}`);
      assert.fail(
        'Something went wrong. Program re-initialized and admin account re-added'
      );
    } catch (e: any) {
      console.log(e.message);
      console.log(
        'Test passed: Unable to initialize poll due to invalid time parameters'
      );
    }
  });

  //------------------- Initialize User tests --------------------
  it('Bob Signing up test', async () => {
    console.log('------- User Signing up ------------');

    let name = 'Bob';
    let title = 'PhD';
    try {
      const initilializeIx = await program.methods
        .signup(name, title)
        .accountsPartial({
          user: bob.publicKey,
        })
        .instruction();

      const blockhashContext = await connection.getLatestBlockhash();

      const tx = new anchor.web3.Transaction({
        feePayer: bob.publicKey,
        blockhash: blockhashContext.blockhash,
        lastValidBlockHeight: blockhashContext.lastValidBlockHeight,
      }).add(initilializeIx);

      const signature = await anchor.web3.sendAndConfirmTransaction(
        connection,
        tx,
        [bob]
      );

      console.log(`Signature: ${signature}`);
    } catch (e: any) {
      console.log(e.message);
      assert.fail('Failed to signup Bob');
    }

    //Test if user_account exist

    const [userAccountAdress, _] = await PublicKey.findProgramAddressSync(
      [Buffer.from('user'), bob.publicKey.toBuffer()],
      programId
    );

    //Get Bob user_account PDA and assert the name, title and owner
    const userAccount = await program.account.userAccount.fetch(
      userAccountAdress
    );

    assert.equal(userAccount.name, name);
  });

  it('Attempt to re-signup Bob user_account', async () => {});
  it('Attempt to signup Karen with invalid paraments', async () => {
    //try to signup witha name larget then the maximum characters allowed
  });

  it('Karen Signing up test', async () => {
    let name = 'Karen';
    let title = 'Professional Fudder';
    try {
      const initilializeIx = await program.methods
        .signup(name, title)
        .accountsPartial({
          user: karen.publicKey,
        })
        .instruction();

      const blockhashContext = await connection.getLatestBlockhash();

      const tx = new anchor.web3.Transaction({
        feePayer: karen.publicKey,
        blockhash: blockhashContext.blockhash,
        lastValidBlockHeight: blockhashContext.lastValidBlockHeight,
      }).add(initilializeIx);

      const signature = await anchor.web3.sendAndConfirmTransaction(
        connection,
        tx,
        [karen]
      );

      console.log(`Signature: ${signature}`);
    } catch {}

    //Test if user_account exist

    //Get Karen user_account PDA and assert the name, title and owner
  });

  it('Karen Signing up test', async () => {
    let name = 'James Bond';
    let title = 'Special Agent';
    try {
      const initilializeIx = await program.methods
        .signup(name, title)
        .accountsPartial({
          user: bond.publicKey,
        })
        .instruction();

      const blockhashContext = await connection.getLatestBlockhash();

      const tx = new anchor.web3.Transaction({
        feePayer: bond.publicKey,
        blockhash: blockhashContext.blockhash,
        lastValidBlockHeight: blockhashContext.lastValidBlockHeight,
      }).add(initilializeIx);

      const signature = await anchor.web3.sendAndConfirmTransaction(
        connection,
        tx,
        [bond]
      );

      console.log(`Signature: ${signature}`);
    } catch {}

    //Test if user_account exist

    //Get Bond user_account PDA and assert the name, title and owner
  });

  //------------ Initialize Edit User Tests ------------------
  it('Bob Edits user_account test', async () => {
    console.log('------- User Editing Account --------------');

    const editUserParams = {
      name: null,
      title: 'Little Genius',
    };

    try {
      const initilializeIx = await program.methods
        .editUser(editUserParams) //---- only works this way
        .accountsPartial({
          user: bob.publicKey,
        })
        .instruction();

      const blockhashContext = await connection.getLatestBlockhash();

      const tx = new anchor.web3.Transaction({
        feePayer: bob.publicKey,
        blockhash: blockhashContext.blockhash,
        lastValidBlockHeight: blockhashContext.lastValidBlockHeight,
      }).add(initilializeIx);

      const signature = await anchor.web3.sendAndConfirmTransaction(
        connection,
        tx,
        [bob]
      );

      console.log(`Signature: ${signature}`);
    } catch {}

    //Test if user_account exist

    //Get Bob user_account PDA and assert the name, title and owner
  });
});
