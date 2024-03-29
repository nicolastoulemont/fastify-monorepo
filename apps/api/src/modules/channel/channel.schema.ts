import { buildJsonSchemas } from "fastify-zod"
import {
  signInInputSchema,
  signInResponseSchema,
  signUpInputSchema,
  signUpResponseSchema,
  updateAccountByIdInputSchema,
  updateAccountByIdResponseSchema,
  deleteAccountByIdResponseSchema,
  getAccountByIdResponseSchema,
  notFoundResponseSchema,
  unAuthorizedResponseSchema,
  successResponseSchema,
} from "@template/schemas"

export const { schemas: channelSchemas, $ref } = buildJsonSchemas({
  signInInputSchema,
  signInResponseSchema,
  signUpInputSchema,
  signUpResponseSchema,
  updateAccountByIdInputSchema,
  updateAccountByIdResponseSchema,
  deleteAccountByIdResponseSchema,
  getAccountByIdResponseSchema,
  notFoundResponseSchema,
  unAuthorizedResponseSchema,
  successResponseSchema,
})
