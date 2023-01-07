import { prisma } from "@template/database"
import {
  CreateChannelByIdInput,
  UpdateChannelByIdInput,
  DeleteChannelByIdInput,
  GetChannelById,
  GetChannelsByAccountId,
  ByIdParam,
} from "@template/schemas"

export async function createChannel({ name }: CreateChannelByIdInput) {
  return await prisma.channel.create({
    data: {
      name,
    },
  })
}

export async function createAccountChannel({
  channelId,
  accountId,
}: {
  channelId: string
  accountId: string
}) {
  return await prisma.accountChannel.create({
    data: { channelId, accountId },
  })
}

export async function updateChannelById(
  { name }: UpdateChannelByIdInput,
  { id }: ByIdParam
) {
  return await prisma.channel.update({
    where: { id },
    data: { name },
  })
}

export async function deleteChannelById({ id }: DeleteChannelByIdInput) {
  return await prisma.account.delete({
    where: {
      id,
    },
  })
}

export async function getChannelById({ id }: GetChannelById) {
  return await prisma.account.findUniqueOrThrow({
    where: { id },
  })
}

export async function getChannelsByAccountId({
  accountId,
}: GetChannelsByAccountId) {
  return await prisma.accountChannel.findMany({
    where: { accountId },
  })
}
