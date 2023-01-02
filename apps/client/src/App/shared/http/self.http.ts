import { api } from "../../../utils"

export async function getSelf() {
  return await api.fetch("/accounts/self", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
}
