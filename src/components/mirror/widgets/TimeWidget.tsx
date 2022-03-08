import React, {useEffect, useState} from 'react';
import Widget, {WidgetSettingsProps} from '../Widget';

const TimeWidget = ({
  widget,
  settings,
  position,
  getAreaElement,
  edit,
}: WidgetSettingsProps) => {
  const [now, setNow] = useState(new Date());
  const [showSeconds, setShowSeconds] = useState(false);
  const [showYear, setShowYear] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setShowSeconds(
      (settings.find(setting => setting.settingName === 'showSeconds')?.value ??
        'false') === 'true'
    );
    setShowYear(
      (settings.find(setting => setting.settingName === 'showYear')?.value ??
        'false') === 'true'
    );
  }, []);

  const language = window.navigator.language;
  const time = now.toLocaleTimeString(language, {
    hour: 'numeric',
    minute: 'numeric',
    second: showSeconds ? 'numeric' : undefined,
  });
  const date = now.toLocaleString(language, {
    weekday: 'long',
    year: showYear ? 'numeric' : undefined,
    month: 'long',
    day: 'numeric',
  });

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
        <h1 className="font-bold text-7xl">{time}</h1>
        <p className="text-3xl">{date}</p>
      </div>
    </Widget>
  );
};

export default TimeWidget;
