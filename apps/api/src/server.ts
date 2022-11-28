import fastify from 'fastify'
import fasitfyCors from '@fastify/cors'
import fastifyMultipart from '@fastify/multipart'
import fastifyWebsockets from '@fastify/websocket'
import fastifySession from '@fastify/session'
import fastifyCookie from '@fastify/cookie'
import { messagesRoutes } from './modules/message/message.route'
import { accountRoutes } from './modules/account/account.route'
import { accountSchemas } from './modules/account/account.schema'

import { healthcheckRoute } from './modules/health-check/health-check.route'

export function buildServer() {
  const server = fastify({ logger: true })

  server.register(fasitfyCors, {
    origin: '*',
  })

  /**
   * `{ attachFieldsToBody: 'keyValues' }` enable JSON Schema validation
   * https://github.com/fastify/fastify-multipart#json-schema-body-validation
   */
  server.register(fastifyMultipart, { attachFieldsToBody: 'keyValues' })
  server.register(fastifyWebsockets)
  server.register(fastifyCookie)
  server.register(fastifySession, {
    secret: process.env.SESSION_SECRET as string,
    cookieName: 'sessionId',
    cookie: { secure: false },
  })

  for (const schema of accountSchemas) {
    server.addSchema(schema)
  }

  server.register(accountRoutes, { prefix: 'api/v1/accounts' })
  server.register(messagesRoutes, { prefix: 'api/v1/messages' })
  server.register(healthcheckRoute, { prefix: 'api/v1/health-check' })

  return server
}
