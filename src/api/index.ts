export default function createRequest(
  url: string,
  method = 'GET',
  body: object | null = null
): Promise<Response> {
  // TODO: change
  return fetch(`http://localhost:8080/api/${url}`, {
    method,
    credentials: 'include',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
      'access-control-allow-origin': '*',
    },
    body: body ? JSON.stringify(body) : null,
  });
}
