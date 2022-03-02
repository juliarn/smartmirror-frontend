import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {getAccountInfo} from '../../store/accountSlice';

const DashboardContent = () => {
  const {accountInfo} = useSelector((state: RootState) => state.account);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccountInfo());
  }, [dispatch]);

  return <>{accountInfo ? accountInfo.username : 'no account info'}</>;
};

export default DashboardContent;
