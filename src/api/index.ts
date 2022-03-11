export default async function createRequest(
  url: string,
  method = 'GET',
  body: object | null = null
): Promise<Response> {
  return await fetch(`/api/${url}`, {
    method,
    credentials: 'include',
    redirect: 'manual',
    headers: {
      'content-type': 'application/json',
    },
    body: body ? JSON.stringify(body) : null,
  });
}
