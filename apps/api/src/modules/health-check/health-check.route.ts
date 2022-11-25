import { FastifyInstance } from 'fastify'

export async function healthcheckRoute(server: FastifyInstance) {
  server.get('/', async (request, reply) => {
    return { status: 'healthy' }
  })
}
