// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import PaperFiIDL from '../target/idl/PaperFi.json'
import type { PaperFi } from '../target/types/PaperFi'

// Re-export the generated IDL and type
export { PaperFi, PaperFiIDL }

// The programId is imported from the program IDL.
export const PAPER_FI_PROGRAM_ID = new PublicKey(PaperFiIDL.address)

// This is a helper function to get the PaperFi Anchor program.
export function getPaperFiProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...PaperFiIDL, address: address ? address.toBase58() : PaperFiIDL.address } as PaperFi, provider)
}

// This is a helper function to get the program ID for the PaperFi program depending on the cluster.
export function getPaperFiProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the PaperFi program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return PAPER_FI_PROGRAM_ID
  }
}
