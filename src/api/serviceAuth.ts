import createRequest from './index';

export async function hasServiceAuth(serviceName: string): Promise<boolean> {
  const response = await createRequest(`/services/auth/${serviceName}`);
  return (await response.json())['hasAuth'];
}
