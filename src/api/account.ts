export interface AccountInfo {
  username: string;
  firstName: string;
}

export interface LoginForm {
  username: string;
  password: string;
}

export interface RegisterForm extends LoginForm {
  firstName: string;
}

export async function register(
  registerForm: RegisterForm
): Promise<string | null> {
  const response = await fetch('api/account/register', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(registerForm),
  });
  return response.ok ? null : (await response.json())['message'];
}

export async function login(loginForm: LoginForm): Promise<boolean> {
  const response = await fetch('api/account/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(loginForm),
  });

  return response.headers.has('set-cookie');
}

export async function getInfo(): Promise<AccountInfo | null> {
  const response = await fetch('api/account/info', {
    method: 'GET',
    credentials: 'include',
  });

  return response.ok ? await response.json() : null;
}
