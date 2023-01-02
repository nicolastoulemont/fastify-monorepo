import {
  Form,
  Link,
  redirect,
  useActionData,
  useLoaderData,
} from "react-router-dom"
import { getUserChannels } from "./Dashboard.http"
import { queryClient } from "../../query"
import { AccountWithoutPassword } from "@template/schemas"
import { api } from "../../../utils"
import { getSelf } from "../../shared/http"

export const loader = async () => {
  const selfRes = await getSelf()
  if (api.isError(selfRes)) {
    return redirect("/signin")
  }
  const self: AccountWithoutPassword = await selfRes.json()

  const channelsRes = await getUserChannels()
  if (api.isError(channelsRes)) {
    return await api.handleError(channelsRes)
  }
  const channels = await channelsRes.json()
  return { self, channels }
}

export function Dashboard() {
  const data = useLoaderData() as Awaited<ReturnType<typeof loader>>

  return (
    <div className="flex h-screen w-full flex-col">
      <header className="flex border-b-2 border-gray-100 py-6 px-9 text-2xl font-bold">
        Welcome Nicolas
      </header>
      <div className="block h-full w-1/4 border-r-2 border-gray-100 p-9 ">
        <button className="mb-6 rounded-lg bg-blue-500 px-3 py-2 text-sm font-medium text-white">
          New Channel
        </button>
      </div>
    </div>
  )
}
