import * as z from "zod"

export const AccountModel = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  password: z.string().min(8, { message: "The password must be at least 8 characters long" }),
})
