import React, {useEffect} from 'react';
import {Outlet, useOutletContext} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {getAccountInfo} from '../../store/accountSlice';
import {AccountInfo} from '../../api/account';

function DashboardScreen() {
  const {accountInfo} = useSelector((state: RootState) => state.account);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccountInfo());
  }, []);

  return (
    <div className={'flex items-center min-h-screen bg-gray-50'}>
      <div className="container mx-auto">
        <div className="max-w-md mx-auto my-10">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-gray-900">
              SmartMirror
            </h1>
          </div>
          <Outlet context={accountInfo} />
        </div>
      </div>
    </div>
  );
}

export function useAccountInfo() {
  return useOutletContext<AccountInfo | null>();
}

export default DashboardScreen;
