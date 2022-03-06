import React, {useEffect, useState} from 'react';
import Widget, {WidgetProps} from '../Widget';

const TimeWidget = ({widget, position, getAreaElement, edit}: WidgetProps) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const language = window.navigator.language;
  const time = now.toLocaleTimeString(language);
  const date = now.toLocaleString(language, {
    weekday: 'long',
    year: 'numeric',
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
        <h1 className="font-bold text-4xl">{time}</h1>
        <p className="text-xl">{date}</p>
      </div>
    </Widget>
  );
};

export default TimeWidget;
