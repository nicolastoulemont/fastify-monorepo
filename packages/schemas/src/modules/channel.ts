import { z } from "zod"
import { AccountChannelModel, ChannelModel } from "../generated"

/**
 * Create
 */
export const createChannelByIdInputSchema = ChannelModel.pick({
  name: true,
})
export type CreateChannelByIdInput = z.infer<
  typeof createChannelByIdInputSchema
>

/**
 * Update
 */
export const updateChannelByIdInputSchema = ChannelModel.pick({
  name: true,
})
export type UpdateChannelByIdInput = z.infer<
  typeof updateChannelByIdInputSchema
>

/**
 * Delete
 */
export const deleteChannelByIdInputSchema = ChannelModel.pick({ id: true })
export type DeleteChannelByIdInput = z.infer<
  typeof deleteChannelByIdInputSchema
>

/**
 * Get
 */
export const getChannelById = ChannelModel.pick({ id: true })
export type GetChannelById = z.infer<typeof getChannelById>
export const getChannelsByAccountId = AccountChannelModel.pick({
  accountId: true,
})
export type GetChannelsByAccountId = z.infer<typeof getChannelsByAccountId>
