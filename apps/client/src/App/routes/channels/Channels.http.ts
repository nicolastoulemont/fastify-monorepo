import { Account } from 'database'
import { api } from '../../../utils'

export type IAccountByIdBody = Omit<Account, 'id'>

export async function getUserChannels() {
  return await api.fetch('/channels', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
