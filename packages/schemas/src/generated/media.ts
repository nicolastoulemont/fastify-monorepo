import * as z from "zod"

export const MediaModel = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  accountId: z.string().uuid(),
  messageId: z.string(),
})
