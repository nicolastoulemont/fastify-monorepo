require('dotenv').config()

import { buildServer } from './server'
import { prisma } from 'database'

const server = buildServer()

const port = 4001

async function main() {
  try {
    server.listen({ port }, (err) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      console.log(`🚀 Server ready at: http://localhost:${port}`)
    })
  } catch (error) {
    prisma.$disconnect()
  }
}

main()
