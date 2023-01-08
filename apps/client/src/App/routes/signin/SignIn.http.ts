import { api } from "@template/sdk"

export async function signIn(credentials: { email: string; password: string }) {
  return await api("/api/v1/accounts/signin", {
    method: "post",
    body: credentials,
  })
}
