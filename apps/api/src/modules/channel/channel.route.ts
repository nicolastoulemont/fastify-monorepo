import { FastifyInstance } from "fastify"
import { $ref } from "./channel.schema"
import {
  getChannelByIdHandler,
  updateChannelByIdHandler,
  createChannelHandler,
  deleteChannelByIdHandler,
  getSelfChannels,
} from "./channel.controller"

export async function channelRoute(server: FastifyInstance) {
  server.post(
    "/create",
    {
      schema: {
        body: $ref("signInInputSchema"),
        response: {
          200: $ref("signInResponseSchema"),
          401: $ref("unAuthorizedResponseSchema"),
        },
      },
    },
    createChannelHandler
  )

  server.put(
    "/:id",
    {
      schema: {
        body: $ref("updateAccountByIdInputSchema"),
        response: {
          201: $ref("updateAccountByIdResponseSchema"),
          404: $ref("notFoundResponseSchema"),
        },
      },
    },
    updateChannelByIdHandler
  )

  server.delete(
    "/:id",
    {
      schema: {
        response: {
          200: $ref("deleteAccountByIdResponseSchema"),
          404: $ref("notFoundResponseSchema"),
        },
      },
    },
    deleteChannelByIdHandler
  )

  server.get(
    "/:id",
    {
      schema: {
        response: {
          200: $ref("getAccountByIdResponseSchema"),
          404: $ref("notFoundResponseSchema"),
        },
      },
    },
    getChannelByIdHandler
  )

  server.get(
    "/self",
    {
      schema: {
        response: {
          200: $ref("signInResponseSchema"),
          404: $ref("notFoundResponseSchema"),
        },
      },
    },
    getSelfChannels
  )
}
