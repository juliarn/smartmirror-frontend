import createRequest from './index';

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
  const response = await createRequest(
    'account/register',
    'POST',
    registerForm
  );
  return response.ok ? null : (await response.json())['message'];
}

export async function login(loginForm: LoginForm): Promise<void> {
  await createRequest('account/login', 'POST', loginForm);
}

export async function getInfo(): Promise<AccountInfo | null> {
  const response = await createRequest('account/info');
  return response.ok ? await response.json() : null;
}
