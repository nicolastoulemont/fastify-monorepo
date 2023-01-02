import {
  Form,
  ActionFunctionArgs,
  redirect,
  Link,
  useActionData,
} from "react-router-dom"
import { signUp } from "./SignUp.http"
import { queryClient } from "../../query"
import { api } from "../../../utils"

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const result = await signUp(formData)
  if (api.isError(result)) {
    return await api.handleError(result)
  }

  await queryClient.invalidateQueries(["account"])
  return redirect("/signin")
}

export function SignUp() {
  const error = useActionData() as API_ERROR
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <Form
        method="post"
        className="w-[400px] space-y-5 rounded-lg bg-white p-12"
      >
        <h1 className="text-center text-3xl font-medium">Sign up</h1>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            className="rounded-lg border-gray-300"
            placeholder="Email"
            required
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            className="rounded-lg border-gray-300"
            placeholder="Password"
            required
            minLength={8}
            type="password"
            name="password"
            id="password"
          />
        </div>
        {error && (
          <div className="flex flex-col rounded-lg bg-red-50 px-3 py-2">
            <h2 className="text-sm font-medium">{error.error}</h2>
            <p className="text-xs">{error.message}</p>
          </div>
        )}
        <div className="flex w-full items-end justify-between">
          <div className="flex flex-col space-y-2">
            <p className="text-sm"> Already have an account ?</p>
            <Link
              to="/signin"
              className="font-medium underline underline-offset-1"
            >
              Sign In
            </Link>
          </div>

          <button
            type="submit"
            className="h-fit rounded-lg bg-blue-500 px-4 py-2 font-medium text-white"
          >
            Sign up
          </button>
        </div>
      </Form>
    </div>
  )
}
