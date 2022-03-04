import React from 'react';
import {Widget, WidgetSetting} from '../../api/widgets';
import WidgetSettingContainer from './WidgetSettingContainer';

interface WidgetContainerProps {
  widget: Widget;
  settings: WidgetSetting[];
  iconUrl: string;
}

const WidgetContainer = (props: WidgetContainerProps) => {
  return (
    <div className="shadow mt-6">
      <div className="border rounded">
        <div className="border-transparent">
          <header className="flex justify-between items-center p-5 px-8">
            <span className="text-grey-darkest font-thin text-2xl">
              {props.widget.displayName}
            </span>
            <div className="w-7 h-7 flex items-center justify-center">
              <img src={props.iconUrl} alt="" />
            </div>
          </header>
        </div>
      </div>
      <div className="bg-grey-lightest border-indigo rounded">
        {props.settings.map(setting => (
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
