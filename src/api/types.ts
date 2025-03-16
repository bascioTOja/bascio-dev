export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface PathParameter {
  name: string;
  type: 'string' | 'number' | 'boolean';
  required: boolean;
}

export interface EndpointDefinition<TParams = {}> {
  path: string;
  method: HttpMethod;
  requiresAuth: boolean;
  pathParameters?: PathParameter[];
  url: (params?: TParams) => string;
}
