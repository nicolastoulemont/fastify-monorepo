import { Account } from 'database'
import { API_URL } from '../../../constants'

export type IAccountByIdBody = Omit<Account, 'id'>

export async function signIn(credentials: IAccountByIdBody) {
  return await fetch(`${API_URL}/accounts/signin`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
}
