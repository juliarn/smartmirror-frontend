import React, {RefObject, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {OptionalAccountInfo} from '../../store/accountSlice';
import {useNavigate} from 'react-router-dom';
import {requestWidgets} from '../../store/widgetsSlice';
import {requestWidgetPositions} from '../../store/widgetPositionsSlice';
import {PositionArea, Widget} from '../../api/widgets';
import TimeWidget from './widgets/TimeWidget';

interface MirrorProps {
  accountInfo: OptionalAccountInfo;
  edit?: boolean;
}

const Mirror = ({accountInfo, edit = false}: MirrorProps) => {
  const {widgets} = useSelector((state: RootState) => state.widgets);
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

  useEffect(() => {
    if (accountInfo === null) {
      navigate('/account/login');
      return;
    }

    dispatch(requestWidgets());
    dispatch(requestWidgetPositions());
  }, [accountInfo]);

  const rowClasses = 'min-h-[33vh] flex justify-between';
  const columnClasses = `min-h-1/3 w-1/3 ${edit ? 'border-white border' : ''}`;

  return (
    <div className="min-h-screen min-w-full bg-black">
      {widgetPositions && widgets && (
        <TimeWidget
          widget={widgets.find(widget => widget.name === 'time') as Widget}
          position={widgetPositions['time']}
          getAreaElement={area =>
            areaRefs[area] ? areaRefs[area].current : null
          }
          edit={edit}
        />
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
