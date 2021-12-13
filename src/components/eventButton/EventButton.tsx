import { useContext, useEffect, useReducer, useRef } from 'react';

import {
  CALENDAR_OFFSET_LEFT,
  EVENT_MIN_HEIGHT,
  EVENT_TABLE_DELIMITER_SPACE,
  MONTH_EVENT_HEIGHT,
} from '../../common/constants';
import {
  CalendarEvent,
  EventLayout,
  EventLayoutMeta,
  EventStyle,
  OnEventClickFunc,
  OnEventDragFinishFunc,
} from '../../common/interface';
import { Context } from '../../context/store';
import { DateTime } from 'luxon';
import { EVENT_TYPE } from '../../common/enums';
import { calculateDaysViewLayout } from '../../utils/eventLayout';
import { calculatePositionForHeaderEvents } from '../calendarHeader/calendarHeaderEvents/CalendarHeaderEvents.utils';
import { formatDateTimeToString } from '../../utils/common';
import { parseAllDayEvents } from '../../utils/allDayEvents';
import { parseEventColor } from '../../utils/calendarDays';
import ButtonBase from '../buttonBase/ButtonBase';
import EventAgenda from './eventAgenda/EventAgenda';
import EventMonth from './eventMonth/EventMonth';
import EventNormal from './eventNormal/EventNormal';
import stateReducer from '../../utils/stateReducer';

const createTempMonthEventsLayout = (): EventLayout => {
  return {
    offsetLeft: 0,
    offsetTop: 0,
    width: '90%',
    height: MONTH_EVENT_HEIGHT,
    zIndex: 1,
    border: 'none',
  };
};

// ref to cancel timout
let timeoutRef: any;

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
  height: 0,
  zIndex: 2,
  border: '',
};

interface EventProps {
  event: CalendarEvent;
  type: EVENT_TYPE;
  handleEventClick: OnEventClickFunc;
  meta?: EventLayoutMeta;
  day?: DateTime;
  onEventDragFinish?: OnEventDragFinishFunc;
}
const EventButton = (props: EventProps) => {
  const {
    event,
    type,
    handleEventClick,
    meta,
    day = DateTime.now(),
    onEventDragFinish,
  } = props;
  const { startAt } = event;

  const [state, dispatchState]: any = useReducer(stateReducer, initialState);
  const setState = (stateName: string, data: any): void => {
    const payload: any = { stateName, data };
    dispatchState({ state, payload });
  };

  const [store, dispatch] = useContext(Context);
  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };

  const {
    isDark,
    width,
    calendarDays,
    hourHeight,
    events,
    timezone,
    selectedView,
    daysViewLayout,
  } = store;

  const columnWidth: number = width / calendarDays.length;
  const eventColor: string = parseEventColor(event.color as string, isDark);

  const style: EventStyle = {
    position:
      type === EVENT_TYPE.MONTH || type === EVENT_TYPE.AGENDA
        ? 'relative'
        : 'absolute',
    height: state.height || EVENT_MIN_HEIGHT,
    width: state.width,
    top: state.offsetTop,
    left: state.offsetLeft,
    zIndex: state.zIndex,
    border: state.zIndex > 2 ? `solid 1px white` : `solid 1px ${eventColor}`,
    backgroundColor: eventColor,
    // alignItems: meta?.centerText ? 'center' : 'inherit',
  };

  // TODO remove?
  // const getEventCalendarDay = (event: any) => {
  //   let result: any;
  //   const eventStartAtDateTime: DateTime = DateTime.fromISO(event.startAt);
  //
  //   calendarDays.forEach((calendarDay: any) => {
  //     const isSameDay = LuxonHelper.isSameDay(
  //       calendarDay.date,
  //       eventStartAtDateTime
  //     );
  //
  //     if (isSameDay) {
  //       result = calendarDay.date;
  //     }
  //   });
  //
  //   return result;
  // };

  const onEventClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    handleEventClick(event);
  };

  const setLayout = (layout: EventLayout) => {
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
  };

  const initStatPosition = () => {
    if (type === EVENT_TYPE.NORMAL && props.day) {
      const formattedDayString: string = formatDateTimeToString(props.day);
      const eventLayout: any = daysViewLayout[formattedDayString]?.[event.id];
      if (eventLayout) {
        setLayout(eventLayout);
      }
    } else if (type === EVENT_TYPE.HEADER) {
      if (store.headerLayout) {
        const headerLayout: any = store.headerLayout[event.id];
        if (headerLayout) {
          setLayout(headerLayout);
        }
      }
    } else {
      setLayout(createTempMonthEventsLayout());
    }
  };

  useEffect(() => {
    initStatPosition();
  }, []);

  useEffect(() => {
    initStatPosition();
  }, [
    daysViewLayout?.[formatDateTimeToString(props.day || DateTime.now())]?.[
      event.id
    ],
  ]);

  useEffect(() => {
    initStatPosition();
  }, [store.layoutUpdateSequence]);

  // store values as refs to access them in event listener
  const offsetTopRef = useRef(state.offsetTop);
  const offsetLeftRef = useRef(state.offsetLeft);
  const xShiftIndexRef = useRef(0);
  const draggingRef = useRef(false);
  const eventWasChangedRef = useRef(false);

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

  const onMoveNormalEvent = (e: any) => {
    if (!draggingRef.current) {
      return;
    }

    if (!day) {
      return;
    }

    const tableElement: any = document.querySelector(
      '.Kalend__Calendar__table'
    );
    const tableElementRect = tableElement.getBoundingClientRect();

    // Get column element for day, where event is placed
    const dayElement: any = document.getElementById(
      `Kalend__day__${day.toString()}`
    );
    if (!dayElement) {
      return;
    }
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

    eventWasChangedRef.current = true;
    setState('offsetTop', y - EVENT_MIN_HEIGHT);
    offsetTopRef.current = y - EVENT_MIN_HEIGHT;

    // prevent overflowing on x-axis
    if (
      columnShiftTable * columnWidth >= width ||
      xTable - CALENDAR_OFFSET_LEFT < 0
    ) {
      return;
    }

    xShiftIndexRef.current = columnShift;
    setState('offsetLeft', columnShift * columnWidth);
    offsetLeftRef.current = x;
  };

  const onMoveHeader = (e: any) => {
    const tableElement: any = document.querySelector(
      '.Kalend__Calendar__table'
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

    if (
      columnShiftTable * columnWidth + CALENDAR_OFFSET_LEFT >= width ||
      xTable < 0
    ) {
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

    const newDay: DateTime = calendarDays.map(
      (calendarDay: DateTime) => calendarDay
    )[xShiftIndexRef.current];

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

    let goingForward = false;
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

        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        onFinishDraggingInternal(newEvent);
      } else if (type === EVENT_TYPE.HEADER) {
        newEvent = calculateHeaderAfterDrag();
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        onFinishDraggingInternal(newEvent);
      }
    }

    e.preventDefault();
    e.stopPropagation();
  };

  // TESTING
  const onFinishDraggingInternal = (eventToUpdate: any) => {
    let result: any = {};
    Object.entries(events).forEach((keyValue: any) => {
      const [date, events] = keyValue;

      events?.forEach((item: any) => {
        if (item.id === eventToUpdate.id) {
          const key: any = DateTime.fromISO(eventToUpdate.startAt).toFormat(
            'dd-MM-yyyy'
          );
          if (result[key]) {
            result[key] = [...result[key], ...[eventToUpdate]];
          } else {
            result[key] = [eventToUpdate];
          }
        } else {
          if (result[date]) {
            result[date] = [...result[date], ...[item]];
          } else {
            result[date] = [item];
          }
        }
      });
    });

    result = parseAllDayEvents(result, timezone);

    setContext('events', result);

    if (type === EVENT_TYPE.NORMAL) {
      const positions: any = calculateDaysViewLayout(
        calendarDays,
        result,
        width,
        timezone,
        hourHeight,
        selectedView
      );
      setContext('daysViewLayout', positions);
    }

    if (type === EVENT_TYPE.HEADER) {
      const headerPositions: any = calculatePositionForHeaderEvents(
        result,
        width / calendarDays.length,
        calendarDays,
        setContext
      );

      setContext('headerLayout', headerPositions);
    }

    setContext('layoutUpdateSequence', store.layoutUpdateSequence + 1);

    // return updated data with callback
    if (onEventDragFinish) {
      onEventDragFinish(eventToUpdate, result);
    }
  };

  /**
   * Start event dragging on long press/touch
   * Set listeners
   * @param e
   */
  const onMouseDownLong = (e: any) => {
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
    // add timeout to differentiate from normal clicks
    timeoutRef = setTimeout(() => {
      onMouseDownLong(e);
    }, 120);
  };

  return (
    <ButtonBase
      id={event.id}
      isDark={isDark}
      style={style}
      className={`Kalend__Event-${type} ${
        draggingRef.current ? 'Kalend__EventButton__elevation' : ''
      } ${store.layoutUpdateSequence === 1 ? 'Kalend__Event__animate' : ''}`}
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
