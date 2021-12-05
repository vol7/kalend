/* eslint-disable */
import React, { useContext, useEffect, useReducer, useRef } from 'react';

import { parseEventColor } from '../../utils/calendarDays';
import EventMonth from './eventMonth/EventMonth';
import EventNormal from './eventNormal/EventNormal';
import EventAgenda from './eventAgenda/EventAgenda';
import { EVENT_TYPE } from '../../common/enums';
import {
  CalendarEvent,
  EventLayoutMeta,
  EventStyle,
  OnEventClickFunc,
  OnEventDragFinishFunc,
} from '../../common/interface';
import ButtonBase from '../buttonBase/ButtonBase';
import { Context } from '../../context/store';
import stateReducer from '../../utils/stateReducer';
import { DateTime } from 'luxon';
import {
  CALENDAR_OFFSET_LEFT,
  EVENT_MIN_HEIGHT,
  EVENT_TABLE_DELIMITER_SPACE,
} from '../../common/constants';

let timeoutRef: any;

const DEFAULT_EVENT_HEIGHT = 14;

const initialState: any = {
  dragging: false,
  initialTop: 0,
  initialLeft: 0,
  offsetTop: 0,
  offsetLeft: 0,
  xPosition: 0,
  //TEMP
  drawingX: 102,
  drawingY: '',
  dayWidth: 102,
  newTime: '',
  currentIndex: '',
  newIndex: '',
  dateFrom: '',
  eventHasChanged: false,
  width: 0,
};

interface EventProps {
  event: CalendarEvent;
  eventWidth: string | number;
  offsetTop?: number;
  offsetLeft?: number;
  eventHeight?: number;
  type: EVENT_TYPE;
  handleEventClick: OnEventClickFunc;
  zIndex: number;
  border?: string;
  meta?: EventLayoutMeta;
  day?: DateTime;
  onEventDragFinish?: OnEventDragFinishFunc;
}
const EventButton = (props: EventProps) => {
  const {
    event,
    eventWidth,
    offsetLeft,
    offsetTop,
    eventHeight = DEFAULT_EVENT_HEIGHT,
    type,
    handleEventClick,
    zIndex,
    meta,
    day,
    onEventDragFinish,
  } = props;
  const { startAt } = event;

  const [state, dispatchState]: any = useReducer(stateReducer, initialState);
  const setState = (stateName: string, data: any): void => {
    const payload: any = { stateName, data };
    // @ts-ignore
    dispatchState({ state, payload });
  };

  const [store] = useContext(Context);
  const { isDark, width, calendarDays, hourHeight } = store;

  const columnWidth: number = width / calendarDays.length;
  const eventColor: string = parseEventColor(event.color as string, isDark);

  const style: EventStyle = {
    position:
      type === EVENT_TYPE.MONTH || type === EVENT_TYPE.AGENDA
        ? 'relative'
        : 'absolute',
    height: eventHeight,
    width: state.width,
    top: state.offsetTop,
    left: state.offsetLeft,
    zIndex,
    border: zIndex > 2 ? `solid 1px white` : `solid 1px ${eventColor}`,
    backgroundColor: eventColor,
    // alignItems: meta?.centerText ? 'center' : 'inherit',
  };

  const onEventClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    handleEventClick(event);
  };

  const initStatPosition = () => {
    setState('initialTop', offsetTop);
    setState('initialLeft', offsetLeft);
    setState('offsetTop', offsetTop);
    setState('offsetLeft', offsetLeft);
    setState('drawingY', offsetTop);
    setState('startAt', startAt);
    setState('width', eventWidth);
  };

  useEffect(() => {
    initStatPosition();
  }, []);

  /**
   * Initial long press click/touch on event
   * @param e
   */
  const onMouseDown = (e: any) => {
    // add timeout to differentiate from normal clicks
    timeoutRef = setTimeout(() => {
      onMouseDownLong(e);
    }, 120);
  };

  /**
   * Start event dragging on long press/touch
   * Set listeners
   * @param e
   */
  const onMouseDownLong = (e: any) => {
    draggingRef.current = true;

    // prevent scrolling while touch event during dragging
    window.addEventListener('touchmove', function () {});

    e.preventDefault();
    e.stopPropagation();

    if (e.button !== 0) return;
    document.addEventListener('mousemove', onMove, true);
    document.addEventListener('mouseup', onMouseUp, true);

    // set temp state while dragging
    initMove();
  };

  const initMove = () => {
    if (type === EVENT_TYPE.NORMAL) {
      setState('offsetLeft', 0);
      setState('width', columnWidth - EVENT_TABLE_DELIMITER_SPACE);
      if (!draggingRef.current) {
        draggingRef.current = true;
      }
    } else if (type === EVENT_TYPE.HEADER) {
      if (!draggingRef.current) {
        draggingRef.current = true;
      }
    }

    // TODO month event
  };

  // store values as refs to access them in event listener
  const offsetTopRef = useRef(state.offsetTop);
  const offsetLeftRef = useRef(state.offsetLeft);
  const xShiftIndexRef = useRef(0);
  const draggingRef = useRef(false);
  const eventWasChangedRef = useRef(false);

  /**
   * Cancel dragging event
   * remove listeners clean long click timeout and reset state
   * @param e
   */
  const onMouseUp = (e: any) => {
    // clean listeners
    document.removeEventListener('mousemove', onMove, true);
    document.removeEventListener('mouseup', onMouseUp, true);
    window.removeEventListener('touchmove', function () {});

    // clear timeout
    clearTimeout(timeoutRef);

    if (!eventWasChangedRef.current) {
      setState('offsetLeft', state.offsetLeft);
      setState('width', state.width);
      draggingRef.current = false;

      return;
    }

    eventWasChangedRef.current = false;

    if (!draggingRef.current) {
      return;
    }

    draggingRef.current = false;

    // add data to callback
    if (onEventDragFinish) {
      let newEvent: CalendarEvent;
      if (type === EVENT_TYPE.NORMAL) {
        newEvent = calculateNewTime(
          offsetTopRef.current,
          offsetLeftRef.current
        );
        onEventDragFinish(newEvent);
      } else if (type === EVENT_TYPE.HEADER) {
        newEvent = calculateHeaderAfterDrag();
        onEventDragFinish(newEvent);
      }
    }

    e.preventDefault();
    e.stopPropagation();
  };

  const onMoveNormalEvent = (e: any) => {
    if (!day) {
      return;
    }

    const tableElement: any = document.querySelector(
      '.Calend__Calendar__table'
    );
    const tableElementRect = tableElement.getBoundingClientRect();

    // Get column element for day, where event is placed
    const dayElement: any = document.getElementById(
      `Calend__day__${day.toString()}`
    );
    const dayElementRect = dayElement.getBoundingClientRect();

    const touches: any = e.nativeEvent?.touches?.[0];

    // set basic coordinates from movement
    let x: number;
    let y: number;

    // handle touch movement
    if (touches) {
      x = touches.clientX - dayElementRect.x;
      y = touches.clientY - dayElementRect.top;
    } else {
      // handle mouse movement
      // calculate x and y coordinates while following mouse move
      x = e.clientX - dayElementRect.x;
      y = e.clientY - dayElementRect.top;
    }

    // prevent free dragging across columns with simple recalculation for
    const columnShift = Math.floor(x / columnWidth);

    const xTable = e.clientX - tableElementRect.x;

    const columnShiftTable = Math.round(xTable / columnWidth);

    // restrict draggable space for timetable
    if (y < 0) {
      return;
    }

    setState('offsetTop', y - EVENT_MIN_HEIGHT);
    offsetTopRef.current = y - EVENT_MIN_HEIGHT;
    eventWasChangedRef.current = true;

    if (columnShiftTable * columnWidth >= width || xTable < 0) {
      return;
    }

    xShiftIndexRef.current = columnShift;
    setState('offsetLeft', columnShift * columnWidth);
    offsetLeftRef.current = x;
  };

  const onMoveHeader = (e: any) => {
    const tableElement: any = document.querySelector(
      '.Calend__Calendar__table'
    );
    const tableElementRect = tableElement.getBoundingClientRect();

    const touches: any = e.nativeEvent?.touches?.[0];

    // set basic coordinates from movement
    let x: number;

    // handle touch movement
    if (touches) {
      x = touches.clientX - tableElementRect.x;
    } else {
      // calculate x coordinates while following mouse move
      x = e.clientX - tableElementRect.x;
    }

    // prevent free dragging across columns with simple recalculation for
    const columnShift = Math.floor(x / columnWidth);

    const xTable = e.clientX - tableElementRect.x - CALENDAR_OFFSET_LEFT;

    const columnShiftTable = Math.round(xTable / columnWidth);

    if (columnShiftTable * columnWidth >= width || xTable < 0) {
      return;
    }

    // prevent event overflowing on last day
    // TODO reset back after moving left again
    // if (columnShift === calendarDays.length) {
    //   setState('width', columnWidth)
    // }

    xShiftIndexRef.current = columnShift;
    setState('offsetLeft', columnShift * columnWidth + CALENDAR_OFFSET_LEFT);
    eventWasChangedRef.current = true;
    offsetLeftRef.current = x;
  };

  const onMove = (e: any) => {
    switch (type) {
      case EVENT_TYPE.NORMAL:
        onMoveNormalEvent(e);
        break;
      case EVENT_TYPE.HEADER:
        onMoveHeader(e);
        break;
      default:
        return;
    }
  };

  const calculateHeaderAfterDrag = (): CalendarEvent => {
    const originalStartAtDateTime = DateTime.fromISO(event.startAt);
    const originalEndAtDateTime = DateTime.fromISO(event.endAt);

    let newDay: DateTime = calendarDays[xShiftIndexRef.current];

    const diffInMinutes: number | undefined = originalEndAtDateTime
      .diff(originalStartAtDateTime, 'minutes')
      .toObject().minutes;

    const newStartAt: DateTime = originalStartAtDateTime.set({
      year: newDay.year,
      day: newDay.day,
      month: newDay.month,
      hour: originalStartAtDateTime.hour,
      minute: originalStartAtDateTime.minute,
    });

    // set correct endAt
    const newEndAt: DateTime = newStartAt.plus({ minutes: diffInMinutes });

    return {
      ...event,
      startAt: newStartAt.toUTC().toString(),
      endAt: newEndAt.toUTC().toString(),
    };
  };

  const calculateNewTime = (
    offsetTopValue: number,
    offsetLeftValue: number
  ): CalendarEvent => {
    const originalStartAtDateTime = DateTime.fromISO(event.startAt);
    const originalEndAtDateTime = DateTime.fromISO(event.endAt);

    let goingForward: boolean = false;
    if (offsetLeftValue >= 0) {
      goingForward = true;
    } else {
      goingForward = false;
    }

    let newDay: DateTime;

    if (goingForward) {
      newDay = originalStartAtDateTime.plus({ days: xShiftIndexRef.current });
    } else {
      newDay = originalStartAtDateTime.minus({
        days: Math.abs(xShiftIndexRef.current),
      });
    }

    const diffInMinutes: number | undefined = originalEndAtDateTime
      .diff(originalStartAtDateTime, 'minutes')
      .toObject().minutes;
    const minutesOffset: number = offsetTopValue / (60 / hourHeight);

    // add minutes calculated from new offset top
    const newStartAt: DateTime = originalStartAtDateTime
      .set({
        year: newDay.year,
        day: newDay.day,
        month: newDay.month,
        hour: 0,
        minute: 0,
      })
      .plus({ minutes: minutesOffset });

    // set correct endAt
    const newEndAt: DateTime = newStartAt.plus({ minutes: diffInMinutes });

    return {
      ...event,
      startAt: newStartAt.toUTC().toString(),
      endAt: newEndAt.toUTC().toString(),
    };
  };

  return (
    <ButtonBase
      id={event.id}
      isDark={isDark}
      style={style}
      className={`Calend__Event-${type} ${
        state.dragging ? 'Calend__EventButton__elevation' : ''
      }`}
      onClick={onEventClick}
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
        <EventNormal event={event} isDark={isDark} type={type} meta={meta} />
      ) : null}
      {type === EVENT_TYPE.AGENDA ? (
        <EventAgenda event={event} isDark={isDark} type={type} />
      ) : null}
    </ButtonBase>
  );
};

export default EventButton;
