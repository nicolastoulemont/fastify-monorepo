<<<<<<< HEAD
import { z } from "zod"
import { AccountModel } from "../generated"
=======
import { z } from 'zod'
import { AccountModel } from '../generated'
>>>>>>> e7f7b77b00a72fc76b7b58f6d2f282a3cac03dd7

/**
 * Shared
 */
const accountWithoutPassword = AccountModel.omit({ password: true })
<<<<<<< HEAD
export type AccountWithoutPassword = z.infer<typeof accountWithoutPassword>
=======
export type AccountWithRoles = z.infer<typeof accountWithoutPassword>
export const notFoundResponseSchema = z.object({ message: z.string() })
export const unAuthorizedResponseSchema = z.object({ message: z.string() })

export type ByIdParam = {
  id: string
}
>>>>>>> e7f7b77b00a72fc76b7b58f6d2f282a3cac03dd7

/**
 * SignIn
 */
export const signInInputSchema = AccountModel.omit({ id: true })
export type SignInInput = z.infer<typeof signInInputSchema>
export const signInResponseSchema = accountWithoutPassword

/**
 * SignUp
 */
export const signUpInputSchema = signInInputSchema
export type SignUpInput = z.infer<typeof signUpInputSchema>

export const signUpResponseSchema = z.object({ success: z.boolean() })

/**
 * Get account
 */
export const getAccountByIdResponseSchema = accountWithoutPassword
<<<<<<< HEAD
export const getAccountsQueryString = z.object({
  id: z.string().uuid().optional(),
  email: z.string().email().optional(),
})
=======
>>>>>>> e7f7b77b00a72fc76b7b58f6d2f282a3cac03dd7

/**
 * Update account
 */
<<<<<<< HEAD
export const updateAccountByIdInputSchema = AccountModel.omit({
  id: true,
  password: true,
})
export type UpdateAccountByIdInput = z.infer<
  typeof updateAccountByIdInputSchema
>
export const updateAccountByIdResponseSchema = AccountModel.omit({
  password: true,
})
=======
export const updateAccountByIdInputSchema = AccountModel.omit({ id: true, password: true })
export type UpdateAccountByIdInput = z.infer<typeof updateAccountByIdInputSchema>
export const updateAccountByIdResponseSchema = AccountModel.omit({ password: true })
>>>>>>> e7f7b77b00a72fc76b7b58f6d2f282a3cac03dd7

/**
 * Delete account
 */
<<<<<<< HEAD
export const deleteAccountByIdResponseSchema = z.object({
  success: z.boolean(),
})
=======

export const deleteAccountByIdResponseSchema = z.object({ success: z.boolean() })

export const successResponseSchema = z.object({ success: z.boolean() })
>>>>>>> e7f7b77b00a72fc76b7b58f6d2f282a3cac03dd7
