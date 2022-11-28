import { Account } from 'database'
import { API_URL } from '../../../constants'

export type IAccountByIdBody = Omit<Account, 'id'>

export async function signIn(credentials: FormData) {
  return await fetch(`${API_URL}/accounts/signin`, {
    method: 'post',
    body: credentials,
  })
}
