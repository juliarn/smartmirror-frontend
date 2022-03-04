import React, {FocusEvent} from 'react';
import {DefaultWidgetSetting, Widget, WidgetSetting} from '../../api/widgets';
import {useDispatch} from 'react-redux';
import {requestWidgetSettingUpdate} from '../../store/widgetSettingsSlice';

interface WidgetSettingContainerProps {
  widget: Widget;
  setting: WidgetSetting;
  defaultSetting: DefaultWidgetSetting;
}

const WidgetSettingContainer = (props: WidgetSettingContainerProps) => {
  const dispatch = useDispatch();

  const handleSettingUpdate = (
    event: FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!event.target) {
      return;
    }

    const value = event.target.value;

    if (value === props.setting.value) {
      return;
    }

    dispatch(
      requestWidgetSettingUpdate({
        widgetName: props.widget.name,
        settingName: props.setting.settingName,
        value,
      })
    );
  };

  return (
    <div
      key={props.setting.settingName}
      className="px-8 py-3 font-thin text-grey-darkest flex justify-between"
    >
      <div className="pl-4">{props.defaultSetting.displayName}</div>
      {!props.defaultSetting.acceptedValues && (
        <input
          onBlur={handleSettingUpdate}
          defaultValue={props.setting.value}
          className="shadow appearance-none border rounded-md pr-4 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
        />
      )}
      {props.defaultSetting.acceptedValues && (
        <select
          onBlur={handleSettingUpdate}
          defaultValue={props.setting.value}
          className="shadow appearance-none border rounded-md pr-4 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
        >
          {props.defaultSetting.acceptedValues.map(acceptedValue => (
            <option key={acceptedValue}>{acceptedValue}</option>
          ))}
        </select>
      )}
    </div>
  );
};

export default WidgetSettingContainer;
