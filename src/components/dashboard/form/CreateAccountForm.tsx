import React, {FormEvent, useState} from 'react';
import {Link} from 'react-router-dom';
import FormField from './FormField';

const CreateAccountForm = () => {
  const [username, setUsername] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const [usernameError, setUsernameError] = useState<string>('');
  const [firstNameError, setFirstNameError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [repeatPasswordError, setRepeatPasswordError] = useState<string>('');

  const handleRegister = (event: FormEvent) => {
    if (!username.trim()) {
      setUsernameError('Please provide a username.');
    }
    if (!password.trim()) {
      setPasswordError('Please provide a password.');
    }

    // TODO: send to backend
    event.preventDefault();
  };

  return (
    <div className="w-full max-w-xs">
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
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
          <Link
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            to="/dashboard/login"
          >
            Already registered?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreateAccountForm;
