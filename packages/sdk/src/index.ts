import { BASE_API_URL } from "./constants"
import { paths } from "./generated/schema"

/**
 * Utility to remove the need for undefined key value from options
 * https://github.com/microsoft/TypeScript/issues/12400
 */
type IfDefinedOnly<Object> = Pick<
  Object,
  NonNullable<
    {
      [Key in keyof Object]: Object[Key] extends undefined ? undefined : Key
    }[keyof Object]
  >
>

type EndpointParams<Endpoint, ParamsType extends string> = Endpoint extends {
  parameters: Record<ParamsType, object>
}
  ? Endpoint["parameters"][ParamsType]
  : undefined

type RequestBody<
  Endpoint,
  BodyType extends string = "application/json"
> = Endpoint extends {
  requestBody: { content: Record<BodyType, object> }
}
  ? Endpoint["requestBody"]["content"][BodyType]
  : undefined

type ResponseWithStatus<Status extends number> = {
  responses: Record<Status, { content: { "application/json": unknown } }>
}
type SuccessResponse<Endpoint> = Endpoint extends ResponseWithStatus<200>
  ? Endpoint["responses"][200]["content"]["application/json"]
  : Endpoint extends ResponseWithStatus<201>
  ? Endpoint["responses"][201]["content"]["application/json"]
  : null

type Options<Method, Endpoint> = Omit<RequestInit, "body"> & {
  method: Method
  headers?: Record<string, string>
} & IfDefinedOnly<{
    query: EndpointParams<Endpoint, "query">
    params: EndpointParams<Endpoint, "path">
    body: RequestBody<Endpoint>
  }>

export default async function api<
  Path extends keyof paths,
  Method extends keyof paths[Path]
>(
  path: Path,
  optionsParams: Options<Method, paths[Path][Method]>
): Promise<SuccessResponse<paths[Path][Method]>> {
  const url = getUrl(path, optionsParams)

  let options: RequestInit & { headers: Record<string, string> } = {
    headers: {
      Accept: "application/json",
    },
    ...optionsParams,
  }

  if (hasObjectBody(optionsParams)) {
    options.body = JSON.stringify(optionsParams.body)
    options.headers["Content-Type"] = "application/json"
  }

  const res = await fetch(url, {
    credentials: "include",
    ...options,
  })

  if (!res.ok) {
    throw res
  }

  return res.json()
}

const PARAMS_REGEX = /\{(.*?)\}/gi
const PARAMS_VALUE_REGEX = /\{(.*)\}/

function parsePath(
  rawPath: string,
  options: { params: Record<string, string> }
): string {
  /**
   * Include the containing brackets in the regex match to allow the match Fn
   * to remove them as well as inserting the correct values in the string
   */
  return rawPath.replaceAll(PARAMS_REGEX, (match) => {
    // This regex doesn't include the containing brackets and only extract the value
    const [_, value] = new RegExp(PARAMS_VALUE_REGEX).exec(
      match
    ) as RegExpExecArray
    return options.params[value]
  })
}

function hasParams(
  rawpath: string,
  options: any
): options is { params: Record<string, string> } {
  const matches = rawpath.match(PARAMS_REGEX)
  return matches !== null && matches.length > 0
}
function hasQuery(options: any): options is { query: Record<string, string> } {
  return (
    typeof options.query !== "undefined" &&
    Object.keys(options.query).length > 0
  )
}

function hasObjectBody(options: any): options is {
  body: Record<string | number | symbol, number | string | Blob>
} {
  return (
    typeof options.body !== "undefined" && Object.keys(options.body).length > 0
  )
}

function getUrl<Path extends keyof paths, Method extends keyof paths[Path]>(
  rawPath: Path,
  options: Options<Method, paths[Path][Method]>
) {
  const path: string = hasParams(rawPath, options)
    ? parsePath(rawPath, options)
    : rawPath

  const url = new URL(path, BASE_API_URL)

  if (hasQuery(options)) {
    url.search = new URLSearchParams(
      (options as any).query as Record<string, string>
    ).toString()
  }

  return url
}
