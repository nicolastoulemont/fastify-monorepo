import { Account } from 'database'
import { API_URL } from '../../../constants'

export type IAccountByIdBody = Omit<Account, 'id'>

export async function signIn(credentials: IAccountByIdBody) {
  const res = await fetch(`${API_URL}/signin`, { method: 'post', body: JSON.stringify(credentials) })
  const account: Account = await res.json()
  return account
}
