import * as z from "zod"
import { CompleteChannel, RelatedChannelModel, CompleteAccount, RelatedAccountModel } from "./index"

export const AccountChannelModel = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  channelId: z.string().uuid(),
  accountId: z.string().uuid(),
})

export interface CompleteAccountChannel extends z.infer<typeof AccountChannelModel> {
  channel: CompleteChannel
  account: CompleteAccount
}

/**
 * RelatedAccountChannelModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAccountChannelModel: z.ZodSchema<CompleteAccountChannel> = z.lazy(() => AccountChannelModel.extend({
  channel: RelatedChannelModel,
  account: RelatedAccountModel,
}))
