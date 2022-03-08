import React, {useEffect} from 'react';
import {DefaultWidgetSetting, Widget, WidgetSetting} from '../../api/widgets';
import WidgetSettingContainer from './WidgetSettingContainer';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {
  requestHasServiceAuth,
  requestRevokeServiceAuth,
} from '../../store/serviceAuthSlice';
import {serviceAuthLogin} from '../../api/serviceAuth';

interface WidgetContainerProps {
  widget: Widget;
  settings: WidgetSetting[];
}

const WidgetContainer = ({widget, settings}: WidgetContainerProps) => {
  const {serviceAuth} = useSelector((state: RootState) => state.serviceAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestHasServiceAuth(widget.name));
  }, []);

  const serviceName = widget.name;
  const hasServiceAuth = serviceAuth[serviceName];

  const handleServiceAuthLogin = async () => {
    await serviceAuthLogin(serviceName);
  };

  const handleServiceAuthRevoke = () => {
    dispatch(requestRevokeServiceAuth(serviceName));
  };

  return (
    <div className="shadow mt-6">
      <div className="border rounded">
        <div className="border-transparent">
          <div className="flex justify-between items-center p-5 px-8">
            <span className="text-grey-darkest font-thin text-2xl">
              {widget.displayName}
            </span>
            <div className="flex items-center justify-center">
              {widget.requiresServiceAuth && (
                <div className="px-4 font-thin text-grey-darkest">
                  {!hasServiceAuth && (
                    <button
                      onClick={handleServiceAuthLogin}
                      className="w-20 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded focus:outline-none focus:shadow-outline"
                    >
                      Login
                    </button>
                  )}
                  {hasServiceAuth && (
                    <button
                      onClick={handleServiceAuthRevoke}
                      className="w-20 py-1 bg-red-500 hover:bg-red-700 text-white rounded focus:outline-none focus:shadow-outline"
                    >
                      Revoke
                    </button>
                  )}
                </div>
              )}
              <img
                className="w-7 h-7 "
                src={require(`../../../public/image/widgets/${widget.name}.png`)}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="my-2 bg-grey-lightest border-indigo rounded">
        {settings.map(setting => (
          <WidgetSettingContainer
            key={setting.settingName}
            widget={widget}
            setting={setting}
            defaultSetting={
              widget.defaultSettings.find(
                defaultSetting =>
                  defaultSetting.settingName === setting.settingName
              ) as DefaultWidgetSetting
            }
          />
        ))}
      </div>
    </div>
  );
};

export default WidgetContainer;
