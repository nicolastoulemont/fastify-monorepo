import fastify from "fastify"
import fastifyCors from "@fastify/cors"
import fastifyMultipart from "@fastify/multipart"
import fastifyWebsockets from "@fastify/websocket"
import fastifySecureSession from "@fastify/secure-session"
import swagger from "@fastify/swagger"
import swaggerUi from "@fastify/swagger-ui"
import { withRefResolver } from "fastify-zod"
import { messagesRoutes } from "./modules/message/message.route"
import { accountRoutes } from "./modules/account/account.route"
import { accountSchemas } from "./modules/account/account.schema"

import { healthcheckRoute } from "./modules/health-check/health-check.route"

export function buildServer() {
  const server = fastify({ logger: true })

  server.register(fastifyCors, {
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })

  /**
   * `{ attachFieldsToBody: 'keyValues' }` enable JSON Schema validation
   * https://github.com/fastify/fastify-multipart#json-schema-body-validation
   */
  server.register(fastifyMultipart, { attachFieldsToBody: "keyValues" })
  server.register(fastifyWebsockets)

  // Auth
  server.register(fastifySecureSession, {
    cookieName: "session",
    // https://github.com/fastify/fastify-secure-session#using-keys-as-strings
    key: Buffer.from(process.env.SESSION_SECRET, "hex"),
    cookie: {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      expires: new Date(new Date().setDate(new Date().getDate() + 1)),
    },
  })

  // Schemas registrations
  for (const schema of accountSchemas) {
    server.addSchema(schema)
  }

  // Open API and Swagger config
  server.register(
    swagger,
    withRefResolver({
      exposeRoute: true,
      openapi: {
        info: {
          title: "Api",
          description: "Api documentation",
          version: "1.0.0",
        },
      },
    })
  )

  server.register(swaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    staticCSP: true,
  })

  // Routes registrations
  server.register(accountRoutes, { prefix: "api/v1/accounts" })
  server.register(messagesRoutes, { prefix: "api/v1/messages" })
  server.register(healthcheckRoute, { prefix: "api/v1/health-check" })

  return server
}
