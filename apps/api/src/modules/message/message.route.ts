import { FastifyInstance } from 'fastify'

export async function messagesRoutes(server: FastifyInstance) {
  server.get('/', { websocket: true }, (connection /* SocketStream */, req /* FastifyRequest */) => {
    connection.socket.on('message', (message: string) => {
      console.log('message', message)
      // message.toString() === 'hi from client'
      connection.socket.send('hi from server')
    })
  })
}
