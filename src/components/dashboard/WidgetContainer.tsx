import React from 'react';
import {Widget, WidgetSetting} from '../../api/widgets';

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
              {props.widget.name}
            </span>
            <div className="w-7 h-7 flex items-center justify-center">
              <img src={props.iconUrl} alt="" />
            </div>
          </header>
        </div>
      </div>
      <div className="bg-grey-lightest border-indigo rounded">
        <div>
          {props.settings.map(setting => (
            <div
              key={setting.settingName}
              className="px-8 py-3 text-grey-darkest"
            >
              <div className="pl-4">{setting.settingName}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WidgetContainer;
