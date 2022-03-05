import React, {RefObject, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store';
import {OptionalAccountInfo} from '../../store/accountSlice';
import {useNavigate} from 'react-router-dom';
import {requestWidgetPositions} from '../../store/widgetPositionsSlice';
import {PositionArea} from '../../api/widgets';

interface MirrorProps {
  accountInfo: OptionalAccountInfo;
  edit?: boolean;
}

const Mirror = (props: MirrorProps) => {
  const {widgetPositions} = useSelector(
    (state: RootState) => state.widgetPositions
  );

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  console.log(Object.values(PositionArea));

  const areaRefs = {} as {
    [area: string]: RefObject<HTMLDivElement>;
  };
  Object.keys(PositionArea)
    .filter(value => isNaN(Number(value)))
    .forEach(area => (areaRefs[area] = useRef<HTMLDivElement>(null)));

  useEffect(() => {
    if (props.accountInfo === null) {
      navigate('/account/login');
      return;
    }

    dispatch(requestWidgetPositions()).unwrap;
  }, [dispatch]);

  const getAreaAnchorPoint = (
    area: PositionArea,
    rect: DOMRect
  ): {x: number; y: number} => {
    const areaName = area.toString();

    let x = 0;
    let y = 0;

    if (areaName.endsWith('CENTER')) {
      x = rect.x + rect.width / 2;
    } else if (areaName.endsWith('RIGHT')) {
      x = rect.right;
    }

    if (areaName.startsWith('MIDDLE')) {
      y = rect.y + rect.height / 2;
    } else if (areaName.startsWith('BOTTOM')) {
      y = rect.bottom;
    }

    return {x, y};
  };

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
    </div>
  );
};

export default Mirror;
