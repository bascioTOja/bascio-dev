import { useRuntimeConfig } from '#app'

export default function useApiFetch() {
  const { token } = useAuth() || { token: ref(null) }
  const config = useRuntimeConfig();

  return async (endpoint: string, options: any = {}) => {
    const baseUrl = config.public.apiBase;
    const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}/${endpoint}`;

    if (import.meta.client) {
      try {
        const data = await $fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: token && token.value ? `${token.value}` : undefined,
          },
        });
        return { data: { value: data }, error: null };
      } catch (error) {
        return { data: { value: null }, error };
      }
    } else {
      // Server-side fetch
      return useFetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: token && token.value ? `${token.value}` : undefined,
        },
      });
    }
  }
}
