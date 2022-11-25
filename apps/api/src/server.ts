import fastify from 'fastify'
import fastifyWebsockets from '@fastify/websocket'
import { messagesRoutes } from './modules/message/message.route'
import { healthcheckRoute } from './modules/health-check/health-check.route'

export function buildServer() {
  const server = fastify()
  server.register(fastifyWebsockets)

  server.register(messagesRoutes, { prefix: 'api/v1/messages' })
  server.register(healthcheckRoute, { prefix: 'api/v1/health-check' })

  return server
}
