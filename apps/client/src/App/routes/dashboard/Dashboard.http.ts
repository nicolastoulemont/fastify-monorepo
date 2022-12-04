import { api } from '../../../utils'

export async function getUserChannels() {
  return await api.fetch('/channels', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
