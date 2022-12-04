import { api } from '../../../utils'

export async function signIn(credentials: FormData) {
  return await api.fetch('/accounts/signin', {
    method: 'post',
    body: credentials,
  })
}
