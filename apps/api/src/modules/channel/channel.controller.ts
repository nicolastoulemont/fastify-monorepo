import { FastifyRequest, FastifyReply } from "fastify"
import {
  CreateChannelByIdInput,
  UpdateChannelByIdInput,
  DeleteChannelByIdInput,
  ByIdParam,
  GetChannelById,
} from "@template/schemas"
import {
  createChannel,
  updateChannelById,
  deleteChannelById,
  getChannelById,
  getChannelsByAccountId,
  createAccountChannel,
} from "./channel.service"

export async function createChannelHandler(
  req: FastifyRequest<{ Body: CreateChannelByIdInput }>,
  reply: FastifyReply
) {
  const user = req.session.get<{ id: string }>("user")
  try {
    const channel = await createChannel(req.body)
    await createAccountChannel({ channelId: channel.id, accountId: user.id })
    reply.status(201).send({ success: true })
  } catch (error) {
    console.error(error)
    reply.status(401).send({ message: "Invalid email or password" })
  }
}

export async function updateChannelByIdHandler(
  req: FastifyRequest<{ Params: ByIdParam; Body: UpdateChannelByIdInput }>,
  reply: FastifyReply
) {
  try {
    const account = await updateChannelById(req.body, req.params)
    reply.send(account)
  } catch (error) {
    console.error(error)
    reply.status(404).send({ message: "Couldn't find the requested resource" })
  }
}

export async function deleteChannelByIdHandler(
  req: FastifyRequest<{ Params: DeleteChannelByIdInput }>,
  reply: FastifyReply
) {
  try {
    await deleteChannelById(req.params)
    reply.send({ success: true })
  } catch (error) {
    console.error(error)
    reply.status(404).send({ message: "Couldn't find the requested resource" })
  }
}

export async function getChannelByIdHandler(
  req: FastifyRequest<{ Params: GetChannelById }>,
  reply: FastifyReply
) {
  try {
    const account = await getChannelById(req.params)
    reply.send(account)
  } catch (error) {
    console.error(error)
    reply.status(404).send({ message: "Couldn't find the requested resource" })
  }
}

export async function getSelfChannels(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const user = req.session.get<{ id: string } | null>("user")
  if (!user?.id) {
    reply.status(404).send({ message: "Not signed in" })
    return
  }

  try {
    const channels = await getChannelsByAccountId({ accountId: user.id })
    reply.send(channels)
  } catch (error) {
    reply.status(404).send({ message: "Invalid session id" })
  }
}
