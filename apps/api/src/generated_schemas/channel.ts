import * as z from "zod"
import { CompleteMessage, RelatedMessageModel, CompleteAccountChannel, RelatedAccountChannelModel } from "./index"

export const ChannelModel = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteChannel extends z.infer<typeof ChannelModel> {
  messages: CompleteMessage[]
  accounts: CompleteAccountChannel[]
}

/**
 * RelatedChannelModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedChannelModel: z.ZodSchema<CompleteChannel> = z.lazy(() => ChannelModel.extend({
  messages: RelatedMessageModel.array(),
  accounts: RelatedAccountChannelModel.array(),
}))
