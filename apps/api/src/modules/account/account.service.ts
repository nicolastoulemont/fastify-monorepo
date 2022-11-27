import { prisma } from 'database'
import bcrypt from 'bcrypt'
import { SignUpInput, SignInInput, UpdateAccountByIdInput, ByIdParam } from './account.schema'

export async function getAccountByEmail(body: SignInInput) {
  const { email } = body
  const account = await prisma.account.findUnique({
    where: { email },
  })
  return account
}

export async function createAccount(body: SignUpInput) {
  const { email, password } = body
  const hash = await bcrypt.hash(password, 12)

  await prisma.account.create({
    data: {
      email,
      password: hash,
    },
  })
}

export async function updateAccountById(body: UpdateAccountByIdInput, params: ByIdParam) {
  const { id } = params
  const { email } = body
  const account = await prisma.account.update({
    where: { id },
    data: {
      email,
    },
  })
  return account
}

export async function deleteAccountById(params: ByIdParam) {
  const { id } = params
  await prisma.account.delete({
    where: {
      id,
    },
  })
}

export async function getAccountById(params: ByIdParam) {
  const { id } = params

  return await prisma.account.findUniqueOrThrow({
    where: { id },
  })
}
