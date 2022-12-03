import bcrypt from 'bcrypt'
import { FastifyRequest, FastifyReply } from 'fastify'
import { SignInInput, SignUpInput, UpdateAccountByIdInput, ByIdParam } from './account.schema'
import {
  createAccount,
  deleteAccountById,
  getAccountByEmail,
  getAccountById,
  updateAccountById,
} from './account.service'

export async function signUpHandler(req: FastifyRequest<{ Body: SignUpInput }>, reply: FastifyReply) {
  try {
    await createAccount(req.body)
    reply.status(201).send({ success: true })
  } catch (error) {
    console.error(error)
    reply.status(401).send({ message: 'Invalid email or password' })
  }
}

export async function signInHandler(req: FastifyRequest<{ Body: SignInInput }>, reply: FastifyReply) {
  const { password } = req.body
  const account = await getAccountByEmail(req.body)

  if (!account) {
    reply.status(401).send({ message: 'Invalid email or password' })
    return
  }

  const match = await bcrypt.compare(password, account.password)
  if (!match) {
    reply.status(401).send({ message: 'Invalid email or password' })
    return
  }

  const { id } = account
  req.session.set('user', { id })

  reply.status(200).send(account)
}

export async function signOutHandler(req: FastifyRequest, reply: FastifyReply) {
  const user = req.session.get<{ id: string }>('user')
  if (!user?.id) {
    reply.status(404).send({ message: 'No session to sign out from' })
  }

  req.session.set('user', null)
  req.session.destroy((err) => {
    if (err) {
      reply.status(500)
      reply.send('Internal Server Error')
    } else {
      reply.status(200).send({ success: true })
    }
  })
}

export async function selfHandler(req: FastifyRequest, reply: FastifyReply) {
  const user = req.session.get<{ id: string } | null>('user')
  if (!user?.id) {
    reply.status(404).send({ message: 'Not signed in' })
    return
  }

  try {
    const account = await getAccountById(user)
    reply.send(account)
  } catch (error) {
    reply.status(404).send({ message: 'Invalid session id' })
  }
}

export async function updateAccountByIdHandler(
  req: FastifyRequest<{ Params: ByIdParam; Body: UpdateAccountByIdInput }>,
  reply: FastifyReply
) {
  try {
    const account = await updateAccountById(req.body, req.params)
    reply.send(account)
  } catch (error) {
    console.error(error)
    reply.status(404).send({ message: "Couldn't find the requested resource" })
  }
}

export async function deleteAccountByIdHandler(req: FastifyRequest<{ Params: ByIdParam }>, reply: FastifyReply) {
  try {
    await deleteAccountById(req.params)
    reply.send({ success: true })
  } catch (error) {
    console.error(error)
    reply.status(404).send({ message: "Couldn't find the requested resource" })
  }
}

export async function getAccountByIdHandler(req: FastifyRequest<{ Params: ByIdParam }>, reply: FastifyReply) {
  try {
    const account = await getAccountById(req.params)
    reply.send(account)
  } catch (error) {
    console.error(error)
    reply.status(404).send({ message: "Couldn't find the requested resource" })
  }
}
