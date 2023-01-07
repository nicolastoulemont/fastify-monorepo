import * as z from "zod"

export const MessageModel = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
<<<<<<< HEAD
  content: z.string(),
  status: z.string(),
  channelId: z.string().uuid(),
  accountId: z.string().uuid(),
=======
  channelId: z.string().uuid(),
  accountId: z.string().uuid(),
  content: z.string(),
>>>>>>> e7f7b77b00a72fc76b7b58f6d2f282a3cac03dd7
})
