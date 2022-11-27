import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

import { AccountModel } from '../../generated_schemas'

/**
 * Shared
 */
export const accountWithoutPassword = AccountModel.omit({ password: true })
export type AccountWithRoles = z.infer<typeof accountWithoutPassword>
export const notFoundResponseSchema = z.object({ message: z.string() })
export const unAuthorizedResponseSchema = z.object({ message: z.string() })

export type ByIdParam = {
  id: string
}

/**
 * SignIn
 */
const signInInputSchema = AccountModel.omit({ id: true })
export type SignInInput = z.infer<typeof signInInputSchema>
export const signInResponseSchema = accountWithoutPassword

/**
 * SignUp
 */
const signUpInputSchema = signInInputSchema
export type SignUpInput = z.infer<typeof signUpInputSchema>

export const signUpResponseSchema = z.object({ success: z.boolean() })

/**
 * Update account
 */
const updateAccountByIdInputSchema = AccountModel.omit({ id: true, password: true })
export type UpdateAccountByIdInput = z.infer<typeof updateAccountByIdInputSchema>
export const updateAccountByIdResponseSchema = AccountModel.omit({ password: true })

/**
 * Delete account
 */

export const deleteAccountByIdResponseSchema = z.object({ success: z.boolean() })

export const successResponseSchema = z.object({ success: z.boolean() })

export const { schemas: accountSchemas, $ref } = buildJsonSchemas({
  signInInputSchema,
  signInResponseSchema,
  signUpInputSchema,
  signUpResponseSchema: signUpResponseSchema,
  updateAccountByIdInputSchema,
  updateAccountByIdResponseSchema,
  deleteAccountByIdResponseSchema,
  getAccountByIdResponseSchema: accountWithoutPassword,
  notFoundResponseSchema,
  unAuthorizedResponseSchema,
  successResponseSchema,
})
