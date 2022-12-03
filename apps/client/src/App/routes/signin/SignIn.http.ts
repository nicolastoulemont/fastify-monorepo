import { Account } from 'database'
import { api } from '../../../utils'

export type IAccountByIdBody = Omit<Account, 'id'>

export async function signIn(credentials: FormData) {
  return await api.fetch('/accounts/signin', {
    method: 'post',
    body: credentials,
  })
}
