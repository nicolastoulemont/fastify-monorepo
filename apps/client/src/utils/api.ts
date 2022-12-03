export const api = {
  fetch: async (...args: Parameters<typeof window.fetch>) => {
    const [ROUTE, options] = args
    const BASE_API_URL = 'http://localhost:4000/api/v1'
    return await fetch(`${BASE_API_URL}${ROUTE}`, {
      credentials: 'include',
      ...options,
    })
  },
  isError: (res: Response) => !res.ok,
  handleError: async (res: Response): Promise<API_ERROR> => {
    const message = await res.json()
    return {
      error: res.statusText,
      statusCode: res.status,
      ...message,
    }
  },
}
