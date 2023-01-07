import { Form, Link, redirect, useActionData } from "react-router-dom"
import type { ActionFunctionArgs } from "react-router-dom"
import { signIn } from "./SignIn.http"
import { queryClient } from "../../query"

import type { AccountWithoutPassword } from "@template/schemas"
import { api } from "../../../utils"

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const result = await signIn(Object.entries(formData) as any)
  // if (api.isError(result)) {
  //   return await api.handleError(result)
  // }

  // const account = (await result.json()) as AccountWithoutPassword
  // await queryClient.invalidateQueries(["account", account.id])
  return redirect("/dashboard")
}

export function SignIn() {
  const error = useActionData() as API_ERROR
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <Form
        method="post"
        id="signin-form"
        className="w-[400px] space-y-5 rounded-lg bg-white p-12"
      >
        <h1 className="text-center text-3xl font-medium">Sign In</h1>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            placeholder="Email"
            className="rounded-lg border-gray-300"
            required
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            placeholder="Password"
            className="rounded-lg border-gray-300"
            required
            type="password"
            name="password"
            id="password"
          />
        </div>
        {error && error.message && (
          <div className="flex flex-col rounded-lg bg-red-50 px-3 py-2">
            <h2 className="text-sm font-medium">{error.error}</h2>
            <p className="text-xs">{error.message}</p>
          </div>
        )}
        <div className="flex w-full items-end justify-between">
          <div className="flex flex-col space-y-2">
            <p className="text-sm"> Don't have an account ?</p>
            <Link
              to="/signup"
              className="font-medium underline underline-offset-1"
            >
              Sign Up
            </Link>
          </div>

          <button
            type="submit"
            className="h-fit rounded-lg bg-blue-500 px-4 py-2 font-medium text-white"
          >
            Sign in
          </button>
        </div>
      </Form>
    </div>
  )
}
