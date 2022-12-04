import { FastifyInstance } from 'fastify'

export async function healthcheckRoute(server: FastifyInstance) {
  server.get('/', async (request, reply) => {
    reply.status(200).send({ status: 'healthy' })
  })
}
