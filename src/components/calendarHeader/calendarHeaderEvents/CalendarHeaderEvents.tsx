import { CALENDAR_OFFSET_LEFT, getDaysNum } from '../../../utils/calendarDays';
import {
  CalendarEvent,
  NormalEventPosition,
  OnEventClickFunc,
} from '../../../common/interface';
import { CalendarHeaderEventsProps } from './CalendarHeaderEvents.props';
import { Context } from '../../../context/store';
import { DateTime } from 'luxon';
import { EVENT_TYPE } from '../../../common/enums';
import { calculatePositionForHeaderEvents } from './CalendarHeaderEvents.utils';
import { getHeight, useHeight } from '../../../utils/layout';
import { useContext, useEffect, useState } from 'react';
import EventButton from '../../eventButton/EventButton';

// TODO REMOVE
// const checkOverlappingEventsInDate = (
//   eventA: EventDecrypted,
//   eventB: EventDecrypted
// ): boolean => {
//   const dateAStart: DateTime = parseToDateTime(
//     eventA.startAt,
//     eventA.timezoneStart
//   );
//   const dateAEnd: DateTime = parseToDateTime(
//     eventA.endAt,
//     eventA.timezoneStart
//   );
//   const dateBStart: DateTime = parseToDateTime(
//     eventB.startAt,
//     eventB.timezoneStart
//   );
//   const dateBEnd: DateTime = parseToDateTime(
//     eventB.endAt,
//     eventB.timezoneStart
//   );
//
//   const dateAStartTruncated = dateAStart
//     .set({ hour: 0, minute: 0, millisecond: 0, second: 0 })
//     .toMillis();
//   const dateAEndTruncated = dateAEnd
//     .set({ hour: 0, minute: 0, millisecond: 0, second: 0 })
//     .toMillis();
//   const dateBStartTruncated = dateBStart
//     .set({ hour: 0, minute: 0, millisecond: 0, second: 0 })
//     .toMillis();
//   const dateBEndTruncated = dateBEnd
//     .set({ hour: 0, minute: 0, millisecond: 0, second: 0 })
//     .toMillis();
//
//   return (
//     dateAStartTruncated <= dateBEndTruncated &&
//     dateBStartTruncated <= dateAEndTruncated
//   );
// };

const CalendarHeaderEvents = (props: CalendarHeaderEventsProps) => {
  const [store, dispatch] = useContext(Context);
  const { selectedView, events, width, calendarDays } = store;

  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };

  const [animation, setAnimation] = useState(
    'Calend__CalendarHeaderEvents_animationExpand'
  );

  const renderEvents = (baseWidth: number, rows: any) => {
    const rowEvents: any = (row: any) => {
      return row.map((item: any) => {
        return (
          <EventButton
            key={item.event.id}
            eventWidth={item.width}
            offsetLeft={item.offsetLeft}
            event={item.event}
            offsetTop={item.offsetTop}
            type={EVENT_TYPE.HEADER}
            handleEventClick={props.handleEventClick}
            zIndex={2}
          />
        );
      });
    };

    return rows.map((row: any) => {
      return (
        <div
          key={row?.[0]?.event.id}
          className={'Calend__CalendarHeaderEvents__eventRow'}
        >
          {rowEvents(row)}
        </div>
      );
    });
  };

  const column = width / getDaysNum(selectedView);

  const colWidthStyle: any = {
    width: column,
  };

  const daysNumbers = calendarDays.map((day: DateTime) => {
    return (
      <div
        key={day.toString()}
        className={'Calend__CalendarHeaderEvents__col-wrapper'}
        style={colWidthStyle}
      ></div>
    );
  });

  const eventPositions: NormalEventPosition[][] =
    calculatePositionForHeaderEvents(
      events,
      width / calendarDays.length,
      calendarDays
    );

  const headerEvents = renderEvents(width, eventPositions);

  const headerStyle: any = {
    // paddingLeft: CALENDAR_OFFSET_LEFT,
    height: eventPositions.length * 22,
    transition: 'all 0.3s',
  };

  useEffect(() => {
    setContext(
      'headerEventRowsCount',
      headerEvents.length ? headerEvents.length : 0
    );

    setTimeout(() => {
      setContext('height', getHeight());
    }, 600);
  }, [headerEvents.length]);

  useEffect(() => {
    // set animation
    setAnimation('Calend__CalendarHeaderEvents_animationExpand');
    // clean animation
    setTimeout(() => {
      setAnimation('');
    }, 600);
  }, [eventPositions.length]);

  return (
    <div
      className={`Calend__CalendarHeaderEvents__container ${animation}`}
      style={headerStyle}
    >
      <div className={'Calend__CalendarHeaderEvents__row'}>{daysNumbers}</div>
      <div className={`Calend__CalendarHeaderEvents__rows ${animation}`}>
        {headerEvents}
      </div>
    </div>
  );
};

export default CalendarHeaderEvents;
