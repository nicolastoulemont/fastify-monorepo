import * as z from "zod"
import { CompleteMessage, RelatedMessageModel, CompleteAccountChannel, RelatedAccountChannelModel } from "./index"

export const AccountModel = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  password: z.string().min(8, { message: "The password must be at least 8 characters long" }),
})

export interface CompleteAccount extends z.infer<typeof AccountModel> {
  messages: CompleteMessage[]
  channels: CompleteAccountChannel[]
}

/**
 * RelatedAccountModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAccountModel: z.ZodSchema<CompleteAccount> = z.lazy(() => AccountModel.extend({
  messages: RelatedMessageModel.array(),
  channels: RelatedAccountChannelModel.array(),
}))
