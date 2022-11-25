import * as z from "zod"
import { CompleteAccount, RelatedAccountModel } from "./index"

export const MessageModel = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  accountId: z.string().uuid(),
  content: z.string(),
})

export interface CompleteMessage extends z.infer<typeof MessageModel> {
  account: CompleteAccount
}

/**
 * RelatedMessageModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMessageModel: z.ZodSchema<CompleteMessage> = z.lazy(() => MessageModel.extend({
  account: RelatedAccountModel,
}))
