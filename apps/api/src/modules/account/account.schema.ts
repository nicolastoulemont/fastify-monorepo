<<<<<<< HEAD
import { buildJsonSchemas } from "fastify-zod"
=======
import { buildJsonSchemas } from 'fastify-zod'
>>>>>>> e7f7b77b00a72fc76b7b58f6d2f282a3cac03dd7
import {
  signInInputSchema,
  signInResponseSchema,
  signUpInputSchema,
  signUpResponseSchema,
  updateAccountByIdInputSchema,
  updateAccountByIdResponseSchema,
  deleteAccountByIdResponseSchema,
  getAccountByIdResponseSchema,
<<<<<<< HEAD
  getAccountsQueryString,
  notFoundResponseSchema,
  unAuthorizedResponseSchema,
  successResponseSchema,
  uuidSchema,
} from "@template/schemas"
=======
  notFoundResponseSchema,
  unAuthorizedResponseSchema,
  successResponseSchema,
} from '@template/schemas'
>>>>>>> e7f7b77b00a72fc76b7b58f6d2f282a3cac03dd7

export const { schemas: accountSchemas, $ref } = buildJsonSchemas({
  signInInputSchema,
  signInResponseSchema,
  signUpInputSchema,
  signUpResponseSchema,
  updateAccountByIdInputSchema,
  updateAccountByIdResponseSchema,
  deleteAccountByIdResponseSchema,
  getAccountByIdResponseSchema,
<<<<<<< HEAD
  getAccountsQueryString,
=======
>>>>>>> e7f7b77b00a72fc76b7b58f6d2f282a3cac03dd7
  notFoundResponseSchema,
  unAuthorizedResponseSchema,
  successResponseSchema,
  uuidSchema,
})
