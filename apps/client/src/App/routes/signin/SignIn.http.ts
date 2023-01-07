// import { api } from '../../../utils'
import { api } from "@template/sdk"

export async function signIn(credentials: { email: string; password: string }) {
  console.log(api)
  // return await api("/api/v1/accounts/signin", {
  //   method: "post",
  //   body: credentials,
  // })
}
