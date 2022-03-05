import React, {FunctionComponent, useEffect, useRef} from 'react';
import {
  PositionArea,
  Widget as WidgetType,
  WidgetPosition,
} from '../../api/widgets';
import Draggable from 'react-draggable';
import {useDispatch} from 'react-redux';
import {requestWidgetPositionUpdate} from '../../store/widgetPositionsSlice';

export interface WidgetProps {
  widget: WidgetType;
  position: WidgetPosition;
  getAreaElement: (area: PositionArea) => HTMLDivElement | null;
}

const Widget: FunctionComponent<WidgetProps> = ({
  widget,
  position,
  getAreaElement,
  children,
}) => {
  const widgetRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const getAreaAnchorPoint = (
    area: PositionArea,
    rect: DOMRect
  ): {x: number; y: number} => {
    let x = 0;
    let y = 0;

    if (area.endsWith('CENTER')) {
      x = rect.x + rect.width / 2;
    } else if (area.endsWith('RIGHT')) {
      x = rect.right;
    }

    if (area.startsWith('MIDDLE')) {
      y = rect.y + rect.height / 2;
    } else if (area.startsWith('BOTTOM')) {
      y = rect.bottom;
    }

    return {x, y};
  };

  useEffect(() => {
    const widgetElement = widgetRef.current;
    const areaElement = getAreaElement(position.area);

    if (widgetElement && areaElement) {
      const anchorPoint = getAreaAnchorPoint(
        position.area,
        areaElement.getBoundingClientRect()
      );

      let x = position.x + anchorPoint.x;
      let y = position.y + anchorPoint.y;

      if (position.area.endsWith('RIGHT')) {
        x -= widgetElement.getBoundingClientRect().width;
      }
      if (position.area.startsWith('BOTTOM')) {
        y -= widgetElement.getBoundingClientRect().height;
      }

      console.log('LOADING ' + position.area + ' ' + x + ' ' + y);

      widgetElement.style.left = x.toString();
      widgetElement.style.top = y.toString();
    }
  });

  const updateWidgetPosition = () => {
    const widgetElement = widgetRef.current;

    if (widgetElement) {
      const widgetRect = widgetElement.getBoundingClientRect();
      console.log(widgetRect);

      const {area, areaRect} = Object.keys(PositionArea)
        .map(area => {
          return {
            area: area as PositionArea,
            areaRect: getAreaElement(
              area as PositionArea
            )?.getBoundingClientRect(),
          };
        })
        .filter(
          ({areaRect}) =>
            areaRect &&
            !(
              widgetRect.right < areaRect.x ||
              widgetRect.x > areaRect.right ||
              widgetRect.bottom < areaRect.y ||
              widgetRect.x > areaRect.bottom
            )
        )
        .map(({area, areaRect}) => {
          let overlap = 0;

          if (areaRect) {
            const overlapWidth =
              Math.min(widgetRect.right, areaRect.right) -
              Math.max(widgetRect.left, areaRect.left);
            const overlapHeight =
              Math.min(widgetRect.bottom, areaRect.bottom) -
              Math.max(widgetRect.top, areaRect.top);

            overlap = overlapWidth * overlapHeight;
          }

          return {
            area,
            areaRect,
            overlap,
          };
        })
        .reduce((previous, current) => {
          return previous.overlap > current.overlap ? previous : current;
        });

      if (areaRect) {
        const anchorPoint = getAreaAnchorPoint(area, areaRect);

        const x =
          (area.endsWith('RIGHT') ? widgetRect.right : widgetRect.left) -
          anchorPoint.x;
        const y =
          (area.startsWith('BOTTOM') ? widgetRect.bottom : widgetRect.top) -
          anchorPoint.y;

        console.log('SAVING ' + area + ' ' + widgetRect.x + ' ' + widgetRect.y);

        dispatch(
          requestWidgetPositionUpdate({
            area: area as PositionArea,
            widgetName: widget.name,
            x,
            y,
          })
        );
      }
    }
  };

  return (
    <Draggable bounds={'parent'} onStop={updateWidgetPosition}>
      <div
        className="absolute border-white border select-none cursor-grab"
        ref={widgetRef}
      >
        {children}
      </div>
    </Draggable>
  );
};

export default Widget;
