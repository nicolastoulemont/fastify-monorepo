import * as z from "zod"

export const MessageModel = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  channelId: z.string().uuid(),
  accountId: z.string().uuid(),
  content: z.string(),
})
