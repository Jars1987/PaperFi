import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Keypair } from '@solana/web3.js';
import { PaperFi } from '../target/types/PaperFi';
import { before, it } from 'mocha';

describe('PaperFi', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const payer = provider.wallet as anchor.Wallet;

  const program = anchor.workspace.PaperFi as Program<PaperFi>;

  const PaperFiKeypair = Keypair.generate();

  before('Preparing enviorement for testing:', async () => {});

  it('Initialize PaperFi', async () => {});
});
