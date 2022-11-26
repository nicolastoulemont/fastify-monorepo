import type { Account } from 'database'
import { API_URL } from '../../../constants'

export type IAccountByIdBody = Omit<Account, 'id'>

export const accountQuery = (id: string) => ({
  queryKey: ['account', id],
  queryFn: async () => getAccount(id),
  staleTime: 30 * 1000,
})

export async function getAccount(id: string): Promise<Account> {
  const res = await fetch(`${API_URL}/accounts/${id}`)
  const account: Account = await res.json()
  return account
}

export async function signUp(credentials: IAccountByIdBody) {
  return await fetch(`${API_URL}/accounts/signup`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
}
