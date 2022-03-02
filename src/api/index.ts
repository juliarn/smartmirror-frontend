export default function createRequest(
  url: string,
  method = 'GET',
  body: object | null = null
): Promise<Response> {
  return fetch(`api/${url}`, {
    method,
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: body ? JSON.stringify(body) : null,
  });
}
