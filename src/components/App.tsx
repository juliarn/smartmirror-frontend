import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import Account from './account/Account';
import Dashboard from './dashboard/Dashboard';
import LoginForm from './account/form/LoginForm';
import RegisterForm from './account/form/RegisterForm';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {requestAccountInfo} from '../store/accountSlice';
import NotFound from './NotFound';

const App = () => {
  const {accountInfo} = useSelector((state: RootState) => state.account);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestAccountInfo());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path={'/'} element={<Dashboard accountInfo={accountInfo} />} />
        <Route
          path={'/account'}
          element={<Account accountInfo={accountInfo} />}
        >
          <Route path={'/account/login'} element={<LoginForm />} />
          <Route path={'/account/register'} element={<RegisterForm />} />
        </Route>
        <Route path={'*'} element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
