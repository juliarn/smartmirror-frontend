import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {
  PositionArea,
  Widget as WidgetType,
  WidgetPosition,
  WidgetSetting,
} from '../../api/widgets';
import Draggable from 'react-draggable';
import {useDispatch} from 'react-redux';
import {requestWidgetPositionUpdate} from '../../store/widgetPositionsSlice';

export interface WidgetProps {
  widget: WidgetType;
  position: WidgetPosition;
  getAreaElement: (area: PositionArea) => HTMLDivElement | null;
  edit: boolean;
}

export interface WidgetSettingsProps extends WidgetProps {
  settings: WidgetSetting[];
}

const Widget: FunctionComponent<WidgetProps> = ({
  widget,
  position,
  getAreaElement,
  edit,
  children,
}) => {
  const [absolutePosition, setAbsolutePosition] = useState({x: 0, y: 0});
  const [dragging, setDragging] = useState(false);

  const widgetRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  // Listen for position and children size updates to load the absolute position again
  useEffect(() => {
    if (!dragging) {
      loadWidgetPosition();
    }
  }, [position, children]);

  // Add a listener for resize events, repositioning the widget
  useEffect(() => {
    const resizeListener = () => loadWidgetPosition();
    window.addEventListener('resize', resizeListener);

    return () => window.removeEventListener('resize', resizeListener);
  }, []);

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

  const loadWidgetPosition = () => {
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

      setAbsolutePosition({x, y});
    }
  };

  const updateWidgetPosition = () => {
    const widgetElement = widgetRef.current;

    if (widgetElement) {
      const widgetRect = widgetElement.getBoundingClientRect();

      const isInsideRect = (rect: DOMRect, x: number, y: number) => {
        return (
          x >= rect.x && x <= rect.right && y >= rect.y && y <= rect.bottom
        );
      };

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
            (isInsideRect(areaRect, widgetRect.x, widgetRect.y) ||
              isInsideRect(areaRect, widgetRect.right, widgetRect.y) ||
              isInsideRect(areaRect, widgetRect.right, widgetRect.bottom) ||
              isInsideRect(areaRect, widgetRect.x, widgetRect.bottom))
        )
        .map(({area, areaRect}) => {
          areaRect = areaRect as DOMRect;

          const overlapWidth =
            Math.min(widgetRect.right, areaRect.right) -
            Math.max(widgetRect.left, areaRect.left);
          const overlapHeight =
            Math.min(widgetRect.bottom, areaRect.bottom) -
            Math.max(widgetRect.top, areaRect.top);

          const overlap = overlapWidth * overlapHeight;
          return {
            area,
            areaRect: areaRect,
            overlap,
          };
        })
        .reduce((previous, current) => {
          return previous.overlap > current.overlap ? previous : current;
        });

      const anchorPoint = getAreaAnchorPoint(area, areaRect);
      const x =
        (area.endsWith('RIGHT') ? widgetRect.right : widgetRect.left) -
        anchorPoint.x;
      const y =
        (area.startsWith('BOTTOM') ? widgetRect.bottom : widgetRect.top) -
        anchorPoint.y;

      setAbsolutePosition({x: widgetRect.x, y: widgetRect.y});
      setDragging(false);
      dispatch(
        requestWidgetPositionUpdate({
          area: area as PositionArea,
          widgetName: widget.name,
          x,
          y,
        })
      );
    }
  };

  return (
    <Draggable
      disabled={!edit}
      position={absolutePosition}
      bounds={'parent'}
      onStart={() => setDragging(true)}
      onStop={updateWidgetPosition}
    >
      <div
        className={`absolute select-none ${
          edit ? 'p-1 border-white border cursor-grab' : ''
        }`}
        ref={widgetRef}
      >
        {children}
      </div>
    </Draggable>
  );
};

export default Widget;
