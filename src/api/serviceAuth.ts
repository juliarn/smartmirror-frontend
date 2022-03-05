import createRequest from './index';

export async function hasServiceAuth(serviceName: string): Promise<boolean> {
  const response = await createRequest(`services/auth/${serviceName}`);
  return (await response.json())['hasAuth'];
}

export async function serviceAuthLogin(serviceName: string): Promise<void> {
  const response = await createRequest(`services/auth/${serviceName}/login`);
  if (response.type === 'opaqueredirect') {
    window.location.href = response.url;
  }
}

export async function revokeServiceAuth(serviceName: string) {
  await createRequest(`services/auth/${serviceName}/revoke`);
}
