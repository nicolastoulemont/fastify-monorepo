import { z } from "zod"

export const notFoundResponseSchema = z.object({ message: z.string() })
export const unAuthorizedResponseSchema = z.object({ message: z.string() })
export const successResponseSchema = z.object({ success: z.boolean() })

export type ByIdParam = {
  id: string
}
