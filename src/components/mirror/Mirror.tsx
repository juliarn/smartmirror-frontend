import React, {RefObject, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {OptionalAccountInfo} from '../../store/accountSlice';
import {useNavigate} from 'react-router-dom';
import {requestWidgets} from '../../store/widgetsSlice';
import {requestWidgetPositions} from '../../store/widgetPositionsSlice';
import {PositionArea, Widget} from '../../api/widgets';
import TimeWidget from './widgets/TimeWidget';
import {requestWidgetSettings} from '../../store/widgetSettingsSlice';
import WeatherWidget from './widgets/WeatherWidget';
import SpotifyWidget from './widgets/SpotifyWidget';

interface MirrorProps {
  accountInfo: OptionalAccountInfo;
  edit?: boolean;
}

const Mirror = ({accountInfo, edit = false}: MirrorProps) => {
  const {widgets} = useSelector((state: RootState) => state.widgets);
  const {widgetSettings} = useSelector(
    (state: RootState) => state.widgetSettings
  );
  const {widgetPositions} = useSelector(
    (state: RootState) => state.widgetPositions
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const areaRefs = {} as {
    [area: string]: RefObject<HTMLDivElement>;
  };
  Object.keys(PositionArea).forEach(
    area => (areaRefs[area] = useRef<HTMLDivElement>(null))
  );

  const getAreaElement = (area: PositionArea) => {
    return areaRefs[area] ? areaRefs[area].current : null;
  };

  useEffect(() => {
    if (accountInfo === null) {
      navigate('/account/login');
      return;
    }

    dispatch(requestWidgets());
    dispatch(requestWidgetSettings());
    dispatch(requestWidgetPositions());
  }, [accountInfo]);

  const rowClasses = 'min-h-[33vh] flex justify-between';
  const columnClasses = `min-h-1/3 w-1/3 ${edit ? 'border-white border' : ''}`;

  return (
    <div className="min-h-screen min-w-full bg-black">
      {widgets && widgetSettings && widgetPositions && (
        <div className="w-full h-screen absolute">
          <TimeWidget
            widget={widgets.find(widget => widget.name === 'time') as Widget}
            settings={widgetSettings['time']}
            position={widgetPositions['time']}
            getAreaElement={getAreaElement}
            edit={edit}
          />
          <WeatherWidget
            widget={widgets.find(widget => widget.name === 'weather') as Widget}
            settings={widgetSettings['weather']}
            position={widgetPositions['weather']}
            getAreaElement={getAreaElement}
            edit={edit}
          />
          <SpotifyWidget
            widget={widgets.find(widget => widget.name === 'spotify') as Widget}
            settings={widgetSettings['spotify']}
            position={widgetPositions['spotify']}
            getAreaElement={getAreaElement}
            edit={edit}
          />
        </div>
      )}
      <div className={rowClasses}>
        <div ref={areaRefs[PositionArea.TOP_LEFT]} className={columnClasses} />
        <div
          ref={areaRefs[PositionArea.TOP_CENTER]}
          className={columnClasses}
        />
        <div ref={areaRefs[PositionArea.TOP_RIGHT]} className={columnClasses} />
      </div>
      <div className={rowClasses}>
        <div
          ref={areaRefs[PositionArea.MIDDLE_LEFT]}
          className={columnClasses}
        />
        <div
          ref={areaRefs[PositionArea.MIDDLE_CENTER]}
          className={columnClasses}
        />
        <div
          ref={areaRefs[PositionArea.MIDDLE_RIGHT]}
          className={columnClasses}
        />
      </div>
      <div className={rowClasses}>
        <div
          ref={areaRefs[PositionArea.BOTTOM_LEFT]}
          className={columnClasses}
        />
        <div
          ref={areaRefs[PositionArea.BOTTOM_CENTER]}
          className={columnClasses}
        />
        <div
          ref={areaRefs[PositionArea.BOTTOM_RIGHT]}
          className={columnClasses}
        />
      </div>
    </div>
  );
};

export default Mirror;
