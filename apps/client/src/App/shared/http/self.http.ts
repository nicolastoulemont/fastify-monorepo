import { Account } from 'database'
import { api } from '../../../utils'

export type IAccountByIdBody = Omit<Account, 'id'>

export async function getSelf() {
  return await api.fetch('/accounts/self', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
