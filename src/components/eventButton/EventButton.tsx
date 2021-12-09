import React, { useContext, useEffect, useState } from 'react';

import {
  CalendarEvent,
  EventLayoutMeta,
  OnEventClickFunc,
} from '../../common/interface';
import { Context } from '../../context/store';
import { EVENT_TYPE } from '../../common/enums';
import { parseEventColor } from '../../utils/calendarDays';
import ButtonBase from '../buttonBase/ButtonBase';
import EventAgenda from './eventAgenda/EventAgenda';
import EventMonth from './eventMonth/EventMonth';
import EventNormal from './eventNormal/EventNormal';

const DEFAULT_EVENT_HEIGHT = 14;

interface EventStyle {
  position: string;
  height: number;
  width: string | number;
  top: number;
  left: number;
  backgroundColor: string;
  transition?: string;
  zIndex?: number;
  border: string;
  alignItems?: string;
}

interface EventProps {
  event: CalendarEvent;
  eventWidth: string | number;
  offsetTop?: number;
  offsetLeft?: number;
  height?: number;
  type: EVENT_TYPE;
  handleEventClick: OnEventClickFunc;
  zIndex: number;
  border?: string;
  meta?: EventLayoutMeta;
}
const EventButton = (props: EventProps) => {
  const {
    event,
    eventWidth,
    offsetLeft,
    offsetTop,
    height = DEFAULT_EVENT_HEIGHT,
    type,
    handleEventClick,
    zIndex,
    meta,
  } = props;

  const [store] = useContext(Context);
  const { isDark } = store;

  const eventColor: string = parseEventColor(event.color as string, isDark);

  const [heightTest, setHeight] = useState(0);

  const style: EventStyle = {
    position:
      type === EVENT_TYPE.MONTH || type === EVENT_TYPE.AGENDA
        ? 'relative'
        : 'absolute',
    height: heightTest,
    width: eventWidth,
    top: offsetTop ? offsetTop : 0,
    left: offsetLeft ? offsetLeft : 0,
    // borderColor: eventColor,
    zIndex,
    border: zIndex > 2 ? `solid 1px white` : `solid 1px ${eventColor}`,
    backgroundColor: /*dragging ? 'blue' : */ eventColor,
    // alignItems: meta?.centerText ? 'center' : 'inherit',
  };

  const onEventClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    handleEventClick(event);
    // history.push(`/${APP_PATH.EVENT_VIEW}/${event.id}`);
  };

  useEffect(() => {
    setHeight(height);
  }, []);

  return (
    <ButtonBase
      isDark={isDark}
      //Dragging func {...panResponder.panHandlers}
      style={style}
      className={`Calend__Event-${type}`}
      onClick={onEventClick}
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

/**
 TODO dragging
 //
 // const getNewOffset = (
 //   currentIndex: any,
 //   clientXRaw: any,
 //   width: any,
 //   daysNum: any,
 //   setState: any
 // ) => {
//   let widthCalendar: any = width - 40; //minus hours column
//   let clientX: any = clientXRaw - 40; //follow mouse but minus right menu
//   let oneDay: any = width / daysNum;
//   let newIndex: any; //index of column under mouse
//   //for desktop
//   if (clientX > 0 && clientX < oneDay) {
//     newIndex = 1;
//   } else if (clientX > oneDay && clientX < 2 * oneDay) {
//     newIndex = 2;
//   } else if (clientX > 2 * oneDay && clientX < 3 * oneDay) {
//     newIndex = 3;
//   } else if (clientX > 3 * oneDay && clientX < 4 * oneDay) {
//     newIndex = 4;
//   } else if (clientX > 4 * oneDay && clientX < 5 * oneDay) {
//     newIndex = 5;
//   } else if (clientX > 5 * oneDay && clientX < 6 * oneDay) {
//     newIndex = 6;
//   } else if (clientX < 0) {
//     newIndex = 0;
//   }
//   let newOffset;
//   if (currentIndex > newIndex) {
//     //moving left
//     // current index is 4, so when moving to begining, index 1, I need to set  as 0 - (3 * width of one day)
//     // current index is 4, so, index 2 has to be 0 - (2* one day)
//     if (newIndex === 0) {
//       newOffset = -(currentIndex * oneDay);
//     } else {
//       newOffset = -((currentIndex - newIndex) * oneDay);
//     }
//   } else if (newIndex > currentIndex) {
//     //moving right
//     newOffset = 0 + (newIndex - currentIndex) * oneDay;
//   } else if (newIndex === currentIndex) {
//   }
//   setState('offsetLeft', newOffset);
//   setState('newIndex', newIndex);
// };

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
};

 interface CalendarEventProps {
  offsetTop: number;
  offsetLeft: number;
  index: number;
  colorName: string;
  isDark: boolean;
  eventHeight: number;
  eventWidth: number;
  event: any;
}
 const CalendarEvent = (props: CalendarEventProps) => {
  const [state, dispatchState] = useReducer(stateReducer, initialState);

  const {
    offsetTop,
    offsetLeft,
    index,
    colorName,
    isDark,
    eventHeight,
    eventWidth,
    event,
  } = props;
  const { startAt } = event;

  const setState = (type: any, payload: any) => {
    // @ts-ignore
    dispatchState({ type, payload });
  };

  const history: any = useHistory();

  useEffect(() => {
    initStatPosition();
  }, []);

  const initStatPosition = () => {
    setState('initialTop', offsetTop);
    setState('initialLeft', offsetLeft);
    setState('offsetTop', offsetTop);
    setState('offsetLeft', offsetLeft);
    setState('drawingY', offsetTop);
    setState('currentIndex', index);
    setState('startAt', startAt);
  };

  //
  // const getNewTime = (offsetTop) => {
  //   //hour * minutes / 1.5 is offsetTop
  //   let newTime = offsetTop * 1.5;
  //   let dateFrom = parse(props.event.dateFrom);
  //   let dateNow;
  //   if (state.currentIndex === state.newIndex) {
  //     dateNow = dateFrom;
  //   } else if (state.currentIndex > state.newIndex) {
  //     //move left, sub days
  //     dateNow = subDays(dateFrom, state.currentIndex - state.newIndex);
  //   } else if (state.currentIndex < state.newIndex) {
  //     //move right, add days
  //     dateNow = addDays(dateFrom, state.newIndex - state.currentIndex);
  //   }
  //   let newDateFrom = addMinutes(
  //     parse(
  //       new Date(getYear(dateNow), getMonth(dateNow), getDate(dateNow), 0, 0, 0)
  //     ),
  //     newTime
  //   );
  //   let hour = parseInt(newTime / 60);
  //   let minutesString = (newTime % 60).toString().slice(0, 1);
  //   let minutes = 60 * parseFloat('0.' + minutesString);
  //
  //   let newDifferenceInMinutes = differenceInMinutes(
  //     parse(props.event.dateTill),
  //     parse(props.event.dateFrom)
  //   );
  //
  //   let newDateTill = addMinutes(newDateFrom, newDifferenceInMinutes);
  //   setState({ dateFrom: newDateFrom, dateTill: newDateTill });
  //   return newTime;
  // };
  //
  // const onMove = (e) => {
  //   if (!state.eventHasChanged) {
  //     setState({ eventHasChanged: true });
  //   }
  //   let screenWidth = e.screenX;
  //   let screenHeight = e.screenY;
  //   let daysNum = 7;
  //   let drawingX = state.drawingX;
  //   let clientX = e.clientX;
  //
  //   let currentIndex = props.index;
  //
  //   setState('offsetTop', state.offsetTop + e.movementY);
  //   getNewOffset(currentIndex, clientX, width, daysNum, setState);
  //   getNewTime(state.offsetTop);
  // };
  //
  // const onMouseDown = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   if (e.button !== 0) return;
  //   document.addEventListener('mousemove', onMouseMove);
  //   document.addEventListener('mouseup', onMouseUp);
  // };
  //
  // const onMouseUp = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   if (state.eventHasChanged) {
  //     editEvent();
  //   }
  //   document.removeEventListener('mousemove', onMouseMove);
  //   document.removeEventListener('mouseup', onMouseUp);
  //   setTimeout(() => {
  //     setState('dragging', false);
  //     setState('eventHasChanged', false);
  //   }, 0);
  // };
  //
  // const onMouseMove = (e) => {
  //   if (!state.dragging) {
  //     setState('dragging', true);
  //   }
  //   onMove(e);
  //   e.preventDefault();
  //   e.stopPropagation();
  // };
  const colorObj: any = calendarColors[colorName ? colorName : 'indigo'];
  const colorCode: string = isDark ? colorObj.dark : colorObj.light;

  const handleEventSelect = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    history.push(`/event/${event.id}`);
  };

  const style = {
    height: eventHeight - 2,
    width: eventWidth,
    borderWidth: 1,
    borderColor: colorCode,
    opacity: 1, //0.4,
    backgroundColor: colorCode,
    top: props.offsetTop,
    left: props.offsetLeft,
    boxShadow: state.dragging
      ? '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
      : '',
  };
**/
