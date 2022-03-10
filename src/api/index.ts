export default async function createRequest(
  url: string,
  method = 'GET',
  body: object | null = null
): Promise<Response> {
  // TODO: change
  const response = await fetch(`http://localhost:8080/api/${url}`, {
    method,
    credentials: 'include',
    mode: 'cors',
    redirect: 'manual',
    headers: {
      'content-type': 'application/json',
      'access-control-allow-origin': '*',
    },
    body: body ? JSON.stringify(body) : null,
  });
}
