function isError(res: Response) {
  return !res.ok
}

async function handleError(res: Response) {
  const message = await res.json()
  return {
    error: res.statusText,
    statusCode: res.status,
    ...message,
  }
}

export const api = { isError, handleError }
