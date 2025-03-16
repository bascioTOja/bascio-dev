import { EndpointDefinition, HttpMethod } from './types';

class ApiEndpointBuilder {
  createEndpoint<TParams = {}>(config: {
    path: string;
    method: HttpMethod;
    requiresAuth: boolean;
    pathParameters?: Array<{
      name: string;
      type: 'string' | 'number' | 'boolean';
      required: boolean;
    }>;
  }): EndpointDefinition<TParams> {
    return {
      ...config,
      url: (params?: TParams) => {
        if (!params) return config.path;

        return config.path.replace(/{([^}]+)}/g, (_, key) => {
          if (params[key] === undefined) {
            throw new Error(`Missing required path parameter: ${key}`);
          }
          return String(params[key]);
        });
      },
    };
  }
}

const builder = new ApiEndpointBuilder();

// Example of use: api.urlShortener.getById.url({ id });
export const api = {
  auth: {
    createToken: builder.createEndpoint({
      path: '/api/jwt/create/',
      method: 'POST',
      requiresAuth: false,
    }),
    refreshToken: builder.createEndpoint({
      path: '/api/jwt/refresh/',
      method: 'POST',
      requiresAuth: false,
    }),
    verifyToken: builder.createEndpoint({
      path: '/api/jwt/verify/',
      method: 'POST',
      requiresAuth: false,
    }),
  },
  tools: {
    getTools: builder.createEndpoint({
      path: '/api/tools/',
      method: 'GET',
      requiresAuth: false,
    }),
  },
  urlShortener: {
    list: builder.createEndpoint({
      path: '/api/urlshortener/shorturls/',
      method: 'GET',
      requiresAuth: true,
    }),
    create: builder.createEndpoint({
      path: '/api/urlshortener/shorturls/',
      method: 'POST',
      requiresAuth: true,
    }),
    getById: builder.createEndpoint<{ id: number }>({
      path: '/api/urlshortener/shorturls/{id}/',
      method: 'GET',
      requiresAuth: true,
      pathParameters: [
        {
          name: 'id',
          type: 'number',
          required: true,
        },
      ],
    }),
    updateById: builder.createEndpoint<{ id: number }>({
      path: '/api/urlshortener/shorturls/{id}/',
      method: 'PUT',
      requiresAuth: true,
      pathParameters: [
        {
          name: 'id',
          type: 'number',
          required: true,
        },
      ],
    }),
    partialUpdateById: builder.createEndpoint<{ id: number }>({
      path: '/api/urlshortener/shorturls/{id}/',
      method: 'PATCH',
      requiresAuth: true,
      pathParameters: [
        {
          name: 'id',
          type: 'number',
          required: true,
        },
      ],
    }),
    deleteById: builder.createEndpoint<{ id: number }>({
      path: '/api/urlshortener/shorturls/{id}/',
      method: 'DELETE',
      requiresAuth: true,
      pathParameters: [
        {
          name: 'id',
          type: 'number',
          required: true,
        },
      ],
    }),
  },
  users: {
    list: builder.createEndpoint({
      path: '/api/users/',
      method: 'GET',
      requiresAuth: true,
    }),
    create: builder.createEndpoint({
      path: '/api/users/',
      method: 'POST',
      requiresAuth: false,
    }),
    getById: builder.createEndpoint<{ id: number }>({
      path: '/api/users/{id}/',
      method: 'GET',
      requiresAuth: true,
      pathParameters: [
        {
          name: 'id',
          type: 'number',
          required: true,
        },
      ],
    }),
    updateById: builder.createEndpoint<{ id: number }>({
      path: '/api/users/{id}/',
      method: 'PUT',
      requiresAuth: true,
      pathParameters: [
        {
          name: 'id',
          type: 'number',
          required: true,
        },
      ],
    }),
    partialUpdateById: builder.createEndpoint<{ id: number }>({
      path: '/api/users/{id}/',
      method: 'PATCH',
      requiresAuth: true,
      pathParameters: [
        {
          name: 'id',
          type: 'number',
          required: true,
        },
      ],
    }),
    deleteById: builder.createEndpoint<{ id: number }>({
      path: '/api/users/{id}/',
      method: 'DELETE',
      requiresAuth: true,
      pathParameters: [
        {
          name: 'id',
          type: 'number',
          required: true,
        },
      ],
    }),
    me: {
      get: builder.createEndpoint({
        path: '/api/users/me/',
        method: 'GET',
        requiresAuth: true,
      }),
      update: builder.createEndpoint({
        path: '/api/users/me/',
        method: 'PUT',
        requiresAuth: true,
      }),
      partialUpdate: builder.createEndpoint({
        path: '/api/users/me/',
        method: 'PATCH',
        requiresAuth: true,
      }),
      delete: builder.createEndpoint({
        path: '/api/users/me/',
        method: 'DELETE',
        requiresAuth: true,
      }),
    },
  },
};

export type Api = typeof api;
