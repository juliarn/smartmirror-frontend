import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {HashRouter, Route, Routes} from 'react-router-dom';
import LoginForm from './components/dashboard/form/LoginForm';
import RegisterForm from './components/dashboard/form/RegisterForm';
import DashboardScreen from './components/dashboard/DashboardScreen';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path={'/dashboard'} element={<DashboardScreen />}>
          <Route path={'/dashboard/login'} element={<LoginForm />} />
          <Route path={'/dashboard/register'} element={<RegisterForm />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
