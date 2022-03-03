import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {OptionalAccountInfo, requestLogout} from '../../store/accountSlice';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import WidgetContainer from './WidgetContainer';
import {requestWidgets} from '../../store/widgetsSlice';
import {requestWidgetSettings} from '../../store/widgetSettingsSlice';

const Dashboard = (props: {accountInfo: OptionalAccountInfo}) => {
  const {widgets} = useSelector((state: RootState) => state.widgets);
  const {widgetSettings} = useSelector(
    (state: RootState) => state.widgetSettings
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {accountInfo} = props;

  useEffect(() => {
    if (accountInfo === null) {
      navigate('/account/login');
      return;
    }

    dispatch(requestWidgets());
    dispatch(requestWidgetSettings());
  }, [accountInfo, navigate, dispatch]);

  const handleLogout = async () => {
    dispatch(requestLogout());
  };

  return (
    <div className="flex items-center min-h-screen bg-gray-50">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto my-10">
          <p className="text-left my-3 text-4xl text-gray-900">
            Hello {accountInfo?.firstName}!
          </p>
          <hr />
          {(widgets ?? []).map(widget => (
            <WidgetContainer
              key={widget.name}
              widget={widget}
              settings={widgetSettings?.[widget.name] ?? []}
              iconUrl="https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png"
            />
          ))}
          <div className="mt-6 flex items-center">
            <button
              onClick={handleLogout}
              className="w-full mx-auto bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
