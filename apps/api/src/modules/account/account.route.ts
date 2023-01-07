import { FastifyInstance } from "fastify"
import { $ref } from "./account.schema"
import { isAuthenticated } from "../../middleware"

import {
  signInHandler,
  signUpHandler,
  updateAccountByIdHandler,
  getAccountByIdHandler,
  deleteAccountByIdHandler,
  signOutHandler,
  selfHandler,
} from "./account.controller"

export async function accountRoutes(server: FastifyInstance) {
  server.post(
    "/signin",
    {
      schema: {
        body: $ref("signInInputSchema"),
        response: {
          200: $ref("signInResponseSchema"),
          401: $ref("unAuthorizedResponseSchema"),
        },
      },
    },
    signInHandler
  )

  server.post(
    "/signup",
    {
      schema: {
        body: $ref("signUpInputSchema"),
        response: {
          201: $ref("signUpResponseSchema"),
          401: $ref("unAuthorizedResponseSchema"),
        },
      },
    },
    signUpHandler
  )

  server.get(
    "/self",
    {
      preHandler: isAuthenticated,
      schema: {
        response: {
          200: $ref("signInResponseSchema"),
          404: $ref("notFoundResponseSchema"),
        },
      },
    },
    selfHandler
  )

  server.post(
    "/signout",
    {
      preHandler: isAuthenticated,
      schema: {
        response: {
          200: $ref("successResponseSchema"),
          404: $ref("notFoundResponseSchema"),
        },
      },
    },
    signOutHandler
  )

  server.put(
    "/:id",
    {
      preHandler: isAuthenticated,
      schema: {
        body: $ref("updateAccountByIdInputSchema"),
        params: $ref("uuidSchema"),
        response: {
          201: $ref("updateAccountByIdResponseSchema"),
          404: $ref("notFoundResponseSchema"),
        },
      },
    },
    updateAccountByIdHandler
  )

  server.delete(
    "/:id",
    {
      preHandler: isAuthenticated,
      schema: {
        params: $ref("uuidSchema"),
        response: {
          200: $ref("deleteAccountByIdResponseSchema"),
          404: $ref("notFoundResponseSchema"),
        },
      },
    },
    deleteAccountByIdHandler
  )

  server.get(
    "/:id",
    {
      preHandler: isAuthenticated,
      schema: {
        params: $ref("uuidSchema"),
        response: {
          200: $ref("getAccountByIdResponseSchema"),
          404: $ref("notFoundResponseSchema"),
        },
      },
    },
    getAccountByIdHandler
  )

  server.get(
    "",
    {
      preHandler: isAuthenticated,
      schema: {
        querystring: $ref("getAccountsQueryString"),
        response: {
          200: $ref("getAccountByIdResponseSchema"),
          404: $ref("notFoundResponseSchema"),
        },
      },
    },
    getAccountByIdHandler
  )
}
