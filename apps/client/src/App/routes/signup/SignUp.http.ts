import type { Account } from 'database'
import { api } from '../../../utils'

export type IAccountByIdBody = Omit<Account, 'id'>

export const accountQuery = (id: string) => ({
  queryKey: ['account', id],
  queryFn: async () => getAccount(id),
  staleTime: 30 * 1000,
})

export async function getAccount(id: string): Promise<Account> {
  const res = await api.fetch(`/accounts/${id}`)
  const account: Account = await res.json()
  return account
}

export async function signUp(credentials: FormData) {
  return await fetch('/accounts/signup', {
    method: 'post',
    body: credentials,
  })
}
