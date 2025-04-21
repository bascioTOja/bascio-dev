import { useRuntimeConfig } from '#app'

export default function useApiFetch() {
  const config = useRuntimeConfig()

  return (endpoint: string, options: any = {}) => {
    const baseUrl = config.public.apiBase
    const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}/${endpoint}`

    return useFetch(url, {
      ...options,
      headers: {
        ...options.headers,
      },
    })
  }
}
