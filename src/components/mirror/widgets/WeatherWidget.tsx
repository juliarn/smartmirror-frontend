import React, {useEffect, useState} from 'react';
import Widget, {WidgetSettingsProps} from '../Widget';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {requestWeather} from '../../../store/weatherSlice';

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
    dispatch(requestWeather());

    const intervalId = setInterval(
      () => dispatch(requestWeather()),
      1000 * 60 * 10
    );
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setUnit(
      settings.find(setting => setting.settingName === 'tempUnit')?.value ?? ''
    );
  }, [settings]);

  const unitSign = unit === 'standard' ? 'K' : '°';
  const right = position.area.endsWith('RIGHT');

  return (
    <Widget
      widget={widget}
      position={position}
      getAreaElement={getAreaElement}
      edit={edit}
    >
      <div className={`text-white ${right ? 'text-right' : ''}`}>
        {fullWeather && (
          <div>
            <div className={`flex ${right ? 'justify-end' : 'justify-start'}`}>
              <h1 className="font-bold text-7xl">{`${Math.round(
                fullWeather.current.main.temp
              )}${unitSign}`}</h1>
              <img
                className="w-16 h-16 my-auto"
                draggable={false}
                src={fullWeather.current.weather[0].icon}
                alt=""
              />
            </div>
            <p className="text-4xl">
              {fullWeather.current.weather[0].description}
            </p>
            <p className="text-xl">
              {fullWeather.current.name}, {fullWeather.current.sys.country}
            </p>
            <div className="flex pt-2">
              {fullWeather.forecast.map(weather => (
                <div
                  key={weather.dt}
                  className={`${right ? 'ml-4' : 'mr-4'} text-center text-lg`}
                >
                  <p>
                    {new Date(weather.dt * 1000).toLocaleTimeString(
                      window.navigator.language,
                      {hour: 'numeric'}
                    )}
                  </p>
                  <img
                    className="w-10 h-10 m-auto"
                    draggable={false}
                    src={weather.weather[0].icon}
                    alt=""
                  />
                  <p>{`${Math.round(weather.main.temp)}${unitSign}`}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {fullWeather === null && edit && (
          <h1 className="font-bold text-xl">
            Allow location access to display weather
          </h1>
        )}
      </div>
    </Widget>
  );
};

export default WeatherWidget;
