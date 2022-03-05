import React, {RefObject, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store';
import {OptionalAccountInfo} from '../../store/accountSlice';
import {useNavigate} from 'react-router-dom';
import {requestWidgetPositions} from '../../store/widgetPositionsSlice';
import {PositionArea} from '../../api/widgets';
import TimeWidget from './widgets/TimeWidget';

interface MirrorProps {
  accountInfo: OptionalAccountInfo;
  edit?: boolean;
}

const Mirror = ({accountInfo}: MirrorProps) => {
  const {widgets} = useSelector((state: RootState) => state.widgets);
  const {widgetPositions} = useSelector(
    (state: RootState) => state.widgetPositions
  );

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const areaRefs = {} as {
    [area: string]: RefObject<HTMLDivElement>;
  };
  Object.keys(PositionArea).forEach(
    area => (areaRefs[area] = useRef<HTMLDivElement>(null))
  );

  useEffect(() => {
    if (accountInfo === null) {
      navigate('/account/login');
      return;
    }

    dispatch(requestWidgetPositions());
  }, [navigate, dispatch]);

  return (
    <div className="min-h-screen min-w-full bg-black">
      <div className="min-h-[33vh] flex justify-between">
        <div
          ref={areaRefs[PositionArea.TOP_LEFT]}
          className="min-h-1/3 w-1/3 border-white border"
        />
        <div
          ref={areaRefs[PositionArea.TOP_CENTER]}
          className="min-h-1/3 w-1/3 border-white border"
        />
        <div
          ref={areaRefs[PositionArea.TOP_RIGHT]}
          className="min-h-1/3 w-1/3 border-white border"
        />
      </div>
      <div className="min-h-[33vh] flex justify-between">
        <div
          ref={areaRefs[PositionArea.MIDDLE_LEFT]}
          className="min-h-1/3 w-1/3 border-white border"
        />
        <div
          ref={areaRefs[PositionArea.MIDDLE_CENTER]}
          className="min-h-1/3 w-1/3 border-white border"
        />
        <div
          ref={areaRefs[PositionArea.MIDDLE_RIGHT]}
          className="min-h-1/3 w-1/3 border-white border"
        />
      </div>
      <div className="min-h-[33vh] flex justify-between">
        <div
          ref={areaRefs[PositionArea.BOTTOM_LEFT]}
          className="min-h-1/3 w-1/3 border-white border"
        />
        <div
          ref={areaRefs[PositionArea.BOTTOM_CENTER]}
          className="min-h-1/3 w-1/3 border-white border"
        />
        <div
          ref={areaRefs[PositionArea.BOTTOM_RIGHT]}
          className="min-h-1/3 w-1/3 border-white border"
        />
      </div>
      {widgetPositions && widgets && (
        <TimeWidget
          widget={
            widgets.find(widget => widget.name === 'time') ?? {
              name: 'time',
              displayName: 'Time',
              defaultSettings: [],
              iconUrl: '',
              requiresServiceAuth: false,
            }
          }
          position={widgetPositions['time']}
          getAreaElement={area =>
            areaRefs[area] ? areaRefs[area].current : null
          }
        />
      )}
    </div>
  );
};

export default Mirror;
