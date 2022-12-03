import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyMultipart from '@fastify/multipart'
import fastifyWebsockets from '@fastify/websocket'
import fastifySecureSession from '@fastify/secure-session'
import { messagesRoutes } from './modules/message/message.route'
import { accountRoutes } from './modules/account/account.route'
import { accountSchemas } from './modules/account/account.schema'

import { healthcheckRoute } from './modules/health-check/health-check.route'

export function buildServer() {
  const server = fastify({ logger: true })

  server.register(fastifyCors, {
    origin: process.env.ORIGIN,
    credentials: true,
  })

  /**
   * `{ attachFieldsToBody: 'keyValues' }` enable JSON Schema validation
   * https://github.com/fastify/fastify-multipart#json-schema-body-validation
   */
  server.register(fastifyMultipart, { attachFieldsToBody: 'keyValues' })
  server.register(fastifyWebsockets)

  server.register(fastifySecureSession, {
    cookieName: 'session',
    // https://github.com/fastify/fastify-secure-session#using-keys-as-strings
    key: Buffer.from(process.env.SESSION_SECRET, 'hex'),
    cookie: {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      expires: new Date(new Date().setDate(new Date().getDate() + 1)),
    },
  })

  for (const schema of accountSchemas) {
    server.addSchema(schema)
  }

  server.register(accountRoutes, { prefix: 'api/v1/accounts' })
  server.register(messagesRoutes, { prefix: 'api/v1/messages' })
  server.register(healthcheckRoute, { prefix: 'api/v1/health-check' })

  return server
}
