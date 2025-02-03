'use client'

import { getPaperFiProgram, getPaperFiProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function usePaperFiProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getPaperFiProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getPaperFiProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['PaperFi', 'all', { cluster }],
    queryFn: () => program.account.PaperFi.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['PaperFi', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ PaperFi: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function usePaperFiProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = usePaperFiProgram()

  const accountQuery = useQuery({
    queryKey: ['PaperFi', 'fetch', { cluster, account }],
    queryFn: () => program.account.PaperFi.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['PaperFi', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ PaperFi: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['PaperFi', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ PaperFi: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['PaperFi', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ PaperFi: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['PaperFi', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ PaperFi: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
