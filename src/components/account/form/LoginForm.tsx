import React, {FormEvent, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import FormField from './FormField';
import {useAccountInfo} from '../Account';
import {requestAccountInfo} from '../../../store/accountSlice';
import {login} from '../../../api/account';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../store';

const LoginForm = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [usernameError, setUsernameError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const accountInfo = useAccountInfo();

  useEffect(() => {
    if (accountInfo) {
      navigate('/');
    }
  }, [accountInfo, navigate]);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    if (!username.trim()) {
      setUsernameError('Please provide an username.');
      return;
    }
    if (!password.trim()) {
      setPasswordError('Please provide a password.');
      return;
    }

    await login({username, password});
    const accountInfo = await dispatch(requestAccountInfo()).unwrap();
    if (accountInfo === null) {
      setUsernameError('Invalid username or password.');
      setPasswordError('Invalid username or password.');
    }
  };

  return (
    <>
      <div className="text-center">
        <p className="text-gray-500 dark:text-gray-500">
          Login to your account
        </p>
      </div>
      <div className="m-7">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-md rounded px-6 pt-6 pb-8 mb-4"
        >
          <FormField
            name={'Username'}
            value={username}
            valueSetter={setUsername}
            valueError={usernameError}
            valueErrorSetter={setUsernameError}
          />
          <FormField
            name={'Password'}
            type={'password'}
            value={password}
            valueError={passwordError}
            valueSetter={setPassword}
            valueErrorSetter={setPasswordError}
          />
          <div className="mt-6 mb-3">
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
          <p className="text-sm text-center text-gray-400">
            No account?{' '}
            <Link
              className="text-sm text-center text-blue-500 hover:text-blue-800"
              to="/account/register"
            >
              Register
            </Link>
            .
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
