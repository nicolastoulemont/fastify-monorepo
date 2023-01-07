import fs from "fs/promises"
import path from "path"

async function main() {
  const generated = path.resolve("src", "generated", "schema.ts")

  const buffer = await fs.readFile(generated)

  const linted = buffer
    .toString()
    /**
     * FIXME: https://github.com/fastify/fastify-swagger/issues/539
     * Prevent optional requestBody parameter when present
     */
    .replaceAll("requestBody?:", "requestBody:")
    /**
     * FIXME: Open Api output an optional parameters key when its children param or query object
     * only contains optional properties. This prevent it to enable better intellisense
     * and type support. At the cost of having to specify an empty param or query object
     * when we don't want to give one
     */
    .replaceAll("parameters?:", "parameters:")
    /**
     * FIXME: Same as above for query objects
     */
    .replaceAll("query?:", "query:")

  await fs.writeFile(generated, linted)
}

main()
