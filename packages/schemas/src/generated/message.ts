import * as z from "zod"

export const MessageModel = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  content: z.string(),
  status: z.string(),
  channelId: z.string().uuid(),
  accountId: z.string().uuid(),
})
