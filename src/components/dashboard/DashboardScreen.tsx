import React from 'react';
import {Outlet} from 'react-router-dom';

function DashboardScreen() {
  return (
    <div className={'grid place-content-center'}>
      <p className={'text-center text-6xl'}>SmartMirror</p>
      <Outlet />
    </div>
  );
}

export default DashboardScreen;
