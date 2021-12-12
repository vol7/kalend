import { CalendarHeaderEventsProps } from './CalendarHeaderEvents.props';
import { Context } from '../../../context/store';
import { DateTime } from 'luxon';
import { EVENT_TYPE } from '../../../common/enums';
import { getDaysNum } from '../../../utils/calendarDays';
import { getHeight } from '../../../utils/layout';
import { useContext, useEffect, useState } from 'react';
import EventButton from '../../eventButton/EventButton';

const CalendarHeaderEvents = (props: CalendarHeaderEventsProps) => {
  const [store, dispatch] = useContext(Context);
  const { selectedView, width, calendarDays } = store;
  const { onEventDragFinish } = props;

  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };

  const [animation, setAnimation] = useState(
    'Kalend__CalendarHeaderEvents_animationExpand'
  );

  const renderEvents = (data: any) => {
    return Object.entries(data)?.map((keyValue: any) => {
      const item: any = keyValue[1];

      return (
        <EventButton
          key={item.event.id}
          event={item.event}
          type={EVENT_TYPE.HEADER}
          handleEventClick={props.handleEventClick}
          onEventDragFinish={onEventDragFinish}
        />
      );
    });
  };

  const column = width / getDaysNum(selectedView);

  const colWidthStyle: any = {
    width: column,
  };

  const daysNumbers = calendarDays.map((calendarDay: DateTime) => {
    return (
      <div
        key={calendarDay.toString()}
        className={'Kalend__CalendarHeaderEvents__col-wrapper'}
        style={colWidthStyle}
      ></div>
    );
  });

  const headerEvents = renderEvents(store.headerLayout);

  const headerStyle: any = {
    // paddingLeft: CALENDAR_OFFSET_LEFT,
    height: store.headerEventRowsCount * 26,
    transition: 'all 0.3s',
  };

  useEffect(() => {
    setTimeout(() => {
      setContext('height', getHeight());
    }, 600);
  }, [store.headerEventRowsCount]);

  useEffect(() => {
    // set animation
    setAnimation('Kalend__CalendarHeaderEvents_animationExpand');
    // clean animation
    setTimeout(() => {
      setAnimation('');
    }, 600);
  }, [store.headerEventRowsCount]);

  return (
    <div
      className={`Kalend__CalendarHeaderEvents__container ${animation}`}
      style={headerStyle}
    >
      <div className={'Kalend__CalendarHeaderEvents__row'}>{daysNumbers}</div>
      {/*<div className={`Kalend__CalendarHeaderEvents__rows ${animation}`}></div>*/}
      {headerEvents}
    </div>
  );
};

export default CalendarHeaderEvents;
