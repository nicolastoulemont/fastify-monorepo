import type { FastifyRequest, FastifyReply } from "fastify"

// @ts-expect-error FIXME: Types mis-matches with routes handlers req & reply types
export async function isAuthenticated(req, reply) {
  try {
    const user = (req as FastifyRequest).session.get<{ id: string }>("user")
    if (!user) {
      return (reply as FastifyReply)
        .status(401)
        .send({ message: "Unauthorized, please login" })
    }
  } catch (error) {
    return (reply as FastifyReply)
      .status(401)
      .send({ message: "Unauthorized, please login" })
  }
}
