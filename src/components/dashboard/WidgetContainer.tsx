import React, {useEffect} from 'react';
import {Widget, WidgetSetting} from '../../api/widgets';
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

const WidgetContainer = (props: WidgetContainerProps) => {
  const {serviceAuth} = useSelector((state: RootState) => state.serviceAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestHasServiceAuth(props.widget.name));
  }, [dispatch]);

  const serviceName = props.widget.name;
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
              {props.widget.displayName}
            </span>
            <div className="flex items-center justify-center">
              {props.widget.requiresServiceAuth && (
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
              <img className="w-7 h-7 " src={props.widget.iconUrl} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="my-2 bg-grey-lightest border-indigo rounded">
        {(!props.widget.requiresServiceAuth || hasServiceAuth) &&
          props.settings.map(setting => (
            <WidgetSettingContainer
              key={setting.settingName}
              widget={props.widget}
              setting={setting}
              defaultSetting={
                props.widget.defaultSettings.find(
                  defaultSetting =>
                    defaultSetting.settingName === setting.settingName
                ) ?? {
                  settingName: setting.settingName,
                  displayName: setting.settingName,
                  defaultValue: setting.value,
                  acceptedValues: null,
                }
              }
            />
          ))}
      </div>
    </div>
  );
};

export default WidgetContainer;
