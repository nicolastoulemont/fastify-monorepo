import fastify, { FastifyReply } from 'fastify'
import fasitfyCors from '@fastify/cors'
import fastifyWebsockets from '@fastify/websocket'
import fastifyJWT from '@fastify/jwt'
import { messagesRoutes } from './modules/message/message.route'
import { accountRoutes } from './modules/account/account.route'
import { accountSchemas } from './modules/account/account.schema'

import { healthcheckRoute } from './modules/health-check/health-check.route'
import { FastifyRequest } from 'fastify'

export function buildServer() {
  const server = fastify()

  server.register(fasitfyCors, {
    origin: '*',
  })

  server.register(fastifyWebsockets)
  server.register(fastifyJWT, { secret: process.env.JWT_SECRET as string })

  server.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      await request.jwtVerify()
    } catch (e) {
      return reply.send(e)
    }
  })

  server.addHook('preHandler', (req, _, next) => {
    // @ts-ignore Cannot reconcile types
    req.jwt = server.jwt
    return next()
  })

  for (const schema of accountSchemas) {
    server.addSchema(schema)
  }

  server.register(accountRoutes, { prefix: 'api/v1/accounts' })
  server.register(messagesRoutes, { prefix: 'api/v1/messages' })
  server.register(healthcheckRoute, { prefix: 'api/v1/health-check' })

  return server
}
