import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginForm from './components/dashboard/form/LoginForm';
import CreateAccountForm from './components/dashboard/form/CreateAccountForm';
import DashboardScreen from './components/dashboard/DashboardScreen';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={'/dashboard'} element={<DashboardScreen />}>
          <Route path={'/dashboard/login'} element={<LoginForm />} />
          <Route path={'/dashboard/register'} element={<CreateAccountForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
