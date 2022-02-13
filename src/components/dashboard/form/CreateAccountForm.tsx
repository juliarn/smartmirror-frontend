import React, {ChangeEvent, FormEvent, useState} from 'react';
import {Link} from 'react-router-dom';

function CreateAccountForm() {
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

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setUsernameError('');
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordError('');
  };

  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            value={username}
            onChange={handleUsernameChange}
            className={`shadow appearance-none border ${
              usernameError ? 'border-red-500' : ''
            } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            id="username"
            type="text"
            placeholder="Username"
          />
          <p className="text-red-500 text-xs italic">{usernameError}</p>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            value={password}
            onChange={handlePasswordChange}
            className={`shadow appearance-none border ${
              passwordError ? 'border-red-500' : ''
            } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            id="password"
            type="password"
            placeholder="Password"
          />
          <p className="text-red-500 text-xs italic">{passwordError}</p>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="repeatPassword"
          >
            Repeat Password
          </label>
          <input
            value={repeatPassword}
            onChange={handlePasswordChange}
            className={`shadow appearance-none border ${
              passwordError ? 'border-red-500' : ''
            } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            id="repeatPassword"
            type="password"
            placeholder="Repeat Password"
          />
          <p className="text-red-500 text-xs italic">{passwordError}</p>
        </div>
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
}

export default CreateAccountForm;
