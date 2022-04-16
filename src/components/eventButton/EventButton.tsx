import { useContext, useEffect, useReducer, useRef } from 'react';

import { CalendarEvent, Config, EventStyle } from '../../common/interface';
import { Context, Store } from '../../context/store';
import { DateTime } from 'luxon';
import { EVENT_TABLE_DELIMITER_SPACE } from '../../common/constants';
import { EVENT_TYPE } from '../../common/enums';
import { EventButtonProps } from './EventButton.props';
import { MONTH_EVENT_HEIGHT } from 'kalend-layout/constants';
import { calculateHeaderAfterDrag, onMoveHeader } from './utils/draggingHeader';
import {
  calculateMonthEventAfterDrag,
  onMoveMonthEvent,
} from './utils/draggingMonth';
import {
  calculateNewTimeWeekDay,
  onMoveNormalEvent,
} from './utils/draggingWeek';
import { checkIfDraggable } from '../../utils/common';
import {
  disableTouchDragging,
  eventButtonInitialState,
} from './EventButton.utils';
import { onFinishDraggingInternal } from './utils/draggingGeneral';
import { parseEventColor } from '../../utils/calendarDays';
import ButtonBase from '../buttonBase/ButtonBase';
import EventAgenda from './eventAgenda/EventAgenda';
import EventMonth from './eventMonth/EventMonth';
import EventNormal from './eventNormal/EventNormal';
import EventShowMoreMonth from './eventShowMoreMonth/EventShowMoreMonth';
import stateReducer from '../../utils/stateReducer';

// ref to cancel timout
let timeoutRef: any;

const EventButton = (props: EventButtonProps) => {
  const { item, type, day = DateTime.now(), index } = props;
  const { event } = item;
  const { startAt } = event;

  const [state, dispatchState]: any = useReducer(
    stateReducer,
    eventButtonInitialState
  );
  const setState = (stateName: string, data: any): void => {
    const payload: any = { stateName, data };
    dispatchState({ state, payload });
  };

  // store values as refs to access them in event listener
  const offsetTopRef = useRef(state.offsetTop);
  const offsetLeftRef = useRef(state.offsetLeft);
  const xShiftIndexRef = useRef(0);
  const yShiftIndexRef = useRef(0);
  const draggingRef = useRef(false);
  const eventWasChangedRef = useRef(false);

  const [store, dispatch] = useContext(Context);
  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };

  const {
    width,
    calendarDays,
    config,
    callbacks,
    height,
    draggingDisabledConditions,
  } = store as Store;

  const { hourHeight, isDark } = config as Config;
  const { onEventClick, onEventDragFinish } = callbacks;

  const columnWidth: number =
    width / (type === EVENT_TYPE.MONTH ? 7 : calendarDays.length);
  const eventColor: string = event.color
    ? parseEventColor(event.color as string, isDark)
    : 'indigo';

  const style: EventStyle = {
    position:
      type === EVENT_TYPE.AGENDA || type === EVENT_TYPE.SHOW_MORE_MONTH
        ? 'relative'
        : 'absolute',
    height:
      state.height !== null ? state.height : item.height || MONTH_EVENT_HEIGHT,
    width: state.width !== null ? state.width : item.width || '100%',
    top: state.offsetTop !== null ? state.offsetTop : item.offsetTop,
    left: state.offsetLeft !== null ? state.offsetLeft : item.offsetLeft,
    zIndex: state.zIndex || item.zIndex,
    border: state.zIndex > 2 ? `solid 1px white` : `solid 1px ${eventColor}`,
    backgroundColor: eventColor,
    visibility: 'visible',
    // alignItems: meta?.centerText ? 'center' : 'inherit',
  };

  const handleEventClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    if (draggingRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      draggingRef.current = false;
      return;
    }

    if (onEventClick) {
      onEventClick(event, e);
    }
  };

  const setLayout = (layout: any) => {
    setState('initialTop', layout.offsetTop);
    setState('initialLeft', layout.offsetLeft);
    setState('offsetTop', layout.offsetTop);
    setState('offsetLeft', layout.offsetLeft);
    setState('drawingY', layout.offsetTop);
    setState('startAt', startAt);
    setState('width', layout.width);
    setState('height', layout.height);
    setState('zIndex', layout.zIndex);
    setState('border', layout.border);
    setState('meta', layout.meta);
  };

  useEffect(() => {
    setLayout(item);
    // initEventButtonPosition(type, props.day, event, store, setLayout, index);
  }, []);

  // useEffect(() => {
  //   initEventButtonPosition(type, props.day, event, store, setLayout, index);
  // }, [
  //   // @ts-ignore
  //   daysViewLayout?.[formatDateTimeToString(props.day || DateTime.now())]?.[
  //     event.id
  //   ],
  // ]);

  // useEffect(() => {
  //   initEventButtonPosition(type, props.day, event, store, setLayout, index);
  // }, [store.layoutUpdateSequence]);

  const initMove = () => {
    if (type === EVENT_TYPE.AGENDA) {
      return;
    }

    if (!draggingRef.current) {
      draggingRef.current = true;
    }

    if (type === EVENT_TYPE.NORMAL) {
      setState('width', columnWidth - EVENT_TABLE_DELIMITER_SPACE);
      setState('offsetLeft', 0);
    }
  };

  const onMove = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (disableTouchDragging(e)) {
      return;
    }
    switch (type) {
      case EVENT_TYPE.NORMAL:
        onMoveNormalEvent(
          e,
          draggingRef,
          day,
          columnWidth,
          width,
          eventWasChangedRef,
          xShiftIndexRef,
          offsetLeftRef,
          offsetTopRef,
          setState
        );
        break;
      case EVENT_TYPE.HEADER:
        onMoveHeader(
          e,
          columnWidth,
          width,
          xShiftIndexRef,
          offsetLeftRef,
          eventWasChangedRef,
          setState
        );
        break;
      case EVENT_TYPE.MONTH:
        onMoveMonthEvent(
          e,
          height,
          draggingRef,
          day,
          columnWidth,
          width,
          xShiftIndexRef,
          yShiftIndexRef,
          eventWasChangedRef,
          offsetLeftRef,
          offsetTopRef,
          setState,
          index || 0
        );
        break;
      default:
        return;
    }
  };

  /**
   * Cancel dragging event
   * remove listeners clean long click timeout and reset state
   * @param e
   */
  const onMouseUp = (e: any) => {
    // clean listeners
    document.removeEventListener('mouseup', onMouseUp, true);
    document.removeEventListener('mousemove', onMove, true);

    // clear timeout
    clearTimeout(timeoutRef);

    if (!eventWasChangedRef.current) {
      setState('offsetLeft', state.offsetLeft);
      setState('width', state.width);
      setState('isDragging', false);
      draggingRef.current = false;

      return;
    }

    eventWasChangedRef.current = false;

    if (!draggingRef.current) {
      return;
    }

    setTimeout(() => {
      draggingRef.current = false;
      setState('isDragging', false);
    }, 100);

    // add data to callback
    if (onEventDragFinish || config.hasExternalLayout) {
      let newEvent: CalendarEvent | null = null;
      if (type === EVENT_TYPE.NORMAL) {
        newEvent = calculateNewTimeWeekDay(
          offsetTopRef.current,
          offsetLeftRef.current,
          xShiftIndexRef,
          event,
          hourHeight
        );
      } else if (type === EVENT_TYPE.HEADER) {
        newEvent = calculateHeaderAfterDrag(
          calendarDays,
          event,
          xShiftIndexRef
        );
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
      } else if (type === EVENT_TYPE.MONTH) {
        newEvent = calculateMonthEventAfterDrag(
          calendarDays,
          yShiftIndexRef,
          xShiftIndexRef,
          event
        );
      }

      if (newEvent) {
        onFinishDraggingInternal(
          event,
          newEvent,
          store,
          setContext,
          type,
          onEventDragFinish
        );
      }
    }

    e.preventDefault();
    e.stopPropagation();
  };

  /**
   * Start event dragging on long press/touch
   * Set listeners
   * @param e
   */
  const onMouseDownLong = (e: any) => {
    if (disableTouchDragging(e)) {
      return;
    }

    const isDraggable = checkIfDraggable(draggingDisabledConditions, event);
    if (!isDraggable) {
      return;
    }

    setState('isDragging', true);
    draggingRef.current = true;

    e.preventDefault();
    e.stopPropagation();

    if (e.button !== 0) return;
    document.addEventListener('mousemove', onMove, true);
    document.addEventListener('mouseup', onMouseUp, true);

    // set temp state while dragging
    initMove();
  };

  /**
   * Initial long press click/touch on event
   * @param e
   */
  const onMouseDown = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    // add timeout to differentiate from normal clicks
    timeoutRef = setTimeout(() => {
      onMouseDownLong(e);
    }, 120);
  };

  return type !== EVENT_TYPE.AGENDA ? (
    <ButtonBase
      id={event.id}
      isDark={isDark}
      style={style}
      className={`Kalend__Event-${type} ${
        state.isDragging ? 'Kalend__EventButton__elevation' : ''
      }`}
      onClick={handleEventClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchStart={onMouseDown}
      onTouchMove={onMove}
      onTouchEnd={onMouseUp}
    >
      {type === EVENT_TYPE.MONTH || type === EVENT_TYPE.HEADER ? (
        <EventMonth event={event} isDark={isDark} type={type} />
      ) : null}
      {type === EVENT_TYPE.NORMAL ? (
        <EventNormal
          event={event}
          isDark={isDark}
          type={type}
          meta={item.meta}
        />
      ) : null}
      {type === EVENT_TYPE.SHOW_MORE_MONTH ? (
        <EventShowMoreMonth event={event} isDark={isDark} type={type} />
      ) : null}
    </ButtonBase>
  ) : (
    <ButtonBase
      id={event.id}
      isDark={isDark}
      className={`Kalend__Event-${type}`}
      onClick={handleEventClick}
    >
      <EventAgenda event={event} isDark={isDark} type={type} />
    </ButtonBase>
  );
};

export default EventButton;
