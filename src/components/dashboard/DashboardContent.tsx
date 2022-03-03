import React from 'react';
import {useAccountInfo} from './DashboardScreen';
import {useNavigate} from 'react-router-dom';

const DashboardContent = () => {
  const navigate = useNavigate();
  const accountInfo = useAccountInfo();

  if (accountInfo === null) {
    navigate('/dashboard/login');
  }

  return <>{accountInfo ? accountInfo.username : 'no account info'}</>;
};

export default DashboardContent;
