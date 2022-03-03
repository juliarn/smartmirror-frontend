import React, {FormEvent, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import FormField from './FormField';
import {register} from '../../../api/account';
import {useAccountInfo} from '../DashboardScreen';

const RegisterForm = () => {
  const [username, setUsername] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const [usernameError, setUsernameError] = useState<string>('');
  const [firstNameError, setFirstNameError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [repeatPasswordError, setRepeatPasswordError] = useState<string>('');

  const navigate = useNavigate();

  if (useAccountInfo()) {
    navigate('/dashboard');
  }

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault();

    if (!username.trim()) {
      setUsernameError('Please provide an username.');
      return;
    }
    if (!firstName.trim()) {
      setFirstNameError('Please provide a first name.');
      return;
    }
    if (!password.trim()) {
      setPasswordError('Please provide a password.');
      return;
    }
    if (!repeatPassword.trim()) {
      setRepeatPasswordError('Please repeat your password.');
      return;
    }
    if (password !== repeatPassword) {
      setPasswordError('The provided passwords do not match.');
      setRepeatPasswordError('The provided passwords do not match.');
      return;
    }

    const errorMessage = await register({username, firstName, password});
    if (errorMessage) {
      setUsernameError(errorMessage + '.');
    } else {
      navigate('/dashboard/login', {replace: true});
    }
  };

  return (
    <>
      <div className="text-center">
        <p className="text-gray-500 dark:text-gray-500">Create your account</p>
      </div>
      <div className="m-7">
        <form
          onSubmit={handleRegister}
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
            name={'First Name'}
            value={firstName}
            valueSetter={setFirstName}
            valueError={firstNameError}
            valueErrorSetter={setFirstNameError}
          />
          <FormField
            name={'Password'}
            type={'password'}
            value={password}
            valueError={passwordError}
            valueSetter={setPassword}
            valueErrorSetter={setPasswordError}
          />
          <FormField
            name={'Repeat Password'}
            type={'password'}
            value={repeatPassword}
            valueError={repeatPasswordError}
            valueSetter={setRepeatPassword}
            valueErrorSetter={setRepeatPasswordError}
          />
          <div className="mt-6 mb-3">
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
          <p className="text-sm text-center text-gray-400">
            Already registered?{' '}
            <Link
              className="text-sm text-center text-blue-500 hover:text-blue-800"
              to="/dashboard/login"
            >
              Login
            </Link>
            .
          </p>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
