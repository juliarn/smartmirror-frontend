import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import DashboardScreen from './dashboard/DashboardScreen';
import DashboardContent from './dashboard/DashboardContent';
import LoginForm from './dashboard/form/LoginForm';
import RegisterForm from './dashboard/form/RegisterForm';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {getAccountInfo} from '../store/accountSlice';

const App = () => {
  const {accountInfo} = useSelector((state: RootState) => state.account);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccountInfo());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route
          path={'/dashboard'}
          element={<DashboardScreen accountInfo={accountInfo} />}
        >
          <Route path={'/dashboard/'} element={<DashboardContent />} />
          <Route path={'/dashboard/login'} element={<LoginForm />} />
          <Route path={'/dashboard/register'} element={<RegisterForm />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
