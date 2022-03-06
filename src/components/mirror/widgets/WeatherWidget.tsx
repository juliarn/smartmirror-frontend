import React, {useEffect, useState} from 'react';
import Widget, {WidgetSettingsProps} from '../Widget';
import {useDispatch, useSelector} from 'react-redux';
import {requestWeather} from '../../../store/weatherSlice';
import {RootState} from '../../../store';

const WeatherWidget = ({
  widget,
  settings,
  position,
  getAreaElement,
  edit,
}: WidgetSettingsProps) => {
  const [unit, setUnit] = useState('');
  const {fullWeather} = useSelector((state: RootState) => state.weather);

  const dispatch = useDispatch();

  useEffect(() => {
    const unitSetting = settings.find(
      setting => setting.settingName === 'tempUnit'
    );

    if (unitSetting) {
      setUnit(unitSetting.value);
      dispatch(requestWeather(unitSetting.value));
    }
  }, [settings]);

  return (
    <Widget
      widget={widget}
      position={position}
      getAreaElement={getAreaElement}
      edit={edit}
    >
      <div
        className={`text-white ${
          position.area.endsWith('RIGHT') ? 'text-right' : ''
        }`}
      >
        {fullWeather && (
          <div>
            <div className="flex justify-between">
              <h1 className="font-bold text-4xl">{`${Math.round(
                fullWeather.current.main.temp
              )} ${unit === 'standard' ? 'K' : '°'}`}</h1>
              <img
                className="w-10 h-10"
                src={fullWeather.current.weather[0].icon}
                alt=""
              />
            </div>
            <p className="text-xl">
              {fullWeather.current.weather[0].description}
            </p>
            <p className="text-sm">{fullWeather.current.name}</p>
          </div>
        )}
        {!fullWeather && edit && (
          <h1 className="font-bold text-3xl">
            Allow location access to display weather
          </h1>
        )}
      </div>
    </Widget>
  );
};

export default WeatherWidget;
