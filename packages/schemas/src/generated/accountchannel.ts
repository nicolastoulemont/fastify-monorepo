import * as z from "zod"

export const AccountChannelModel = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  channelId: z.string().uuid(),
  accountId: z.string().uuid(),
})
