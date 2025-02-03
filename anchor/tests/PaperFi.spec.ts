import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {PaperFi} from '../target/types/PaperFi'

describe('PaperFi', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.PaperFi as Program<PaperFi>

  const PaperFiKeypair = Keypair.generate()

  it('Initialize PaperFi', async () => {
    await program.methods
      .initialize()
      .accounts({
        PaperFi: PaperFiKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([PaperFiKeypair])
      .rpc()

    const currentCount = await program.account.PaperFi.fetch(PaperFiKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment PaperFi', async () => {
    await program.methods.increment().accounts({ PaperFi: PaperFiKeypair.publicKey }).rpc()

    const currentCount = await program.account.PaperFi.fetch(PaperFiKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment PaperFi Again', async () => {
    await program.methods.increment().accounts({ PaperFi: PaperFiKeypair.publicKey }).rpc()

    const currentCount = await program.account.PaperFi.fetch(PaperFiKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement PaperFi', async () => {
    await program.methods.decrement().accounts({ PaperFi: PaperFiKeypair.publicKey }).rpc()

    const currentCount = await program.account.PaperFi.fetch(PaperFiKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set PaperFi value', async () => {
    await program.methods.set(42).accounts({ PaperFi: PaperFiKeypair.publicKey }).rpc()

    const currentCount = await program.account.PaperFi.fetch(PaperFiKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the PaperFi account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        PaperFi: PaperFiKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.PaperFi.fetchNullable(PaperFiKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
