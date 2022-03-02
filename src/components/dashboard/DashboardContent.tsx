import React from 'react';
import {useAccountInfo} from './DashboardScreen';

const DashboardContent = () => {
  const accountInfo = useAccountInfo();

  return <>{accountInfo ? accountInfo.username : 'no account info'}</>;
};

export default DashboardContent;
