import React from 'react';
import {Outlet} from 'react-router-dom';

function DashboardScreen() {
  return (
    <div className={'flex items-center min-h-screen bg-gray-50'}>
      <div className="container mx-auto">
        <div className="max-w-md mx-auto my-10">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-gray-900">
              SmartMirror
            </h1>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardScreen;
