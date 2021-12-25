import { Context } from '../../../context/store';
import { EVENT_TYPE } from '../../../common/enums';
import { MonthWeekRowProps } from './MonthWeekRow.props';
import { useContext } from 'react';
import CalendarHeaderDates from '../../calendarHeader/components/calendarHeaderDates/CalendarHeaderDates';
import EventButton from '../../eventButton/EventButton';
import MonthViewButtonMore from '../monthViewButtonMore/MonthViewButtonMore';

const MonthWeekRow = (props: MonthWeekRowProps) => {
  const { days, index } = props;

  const [store] = useContext(Context);
  const { monthLayout, height } = store;

  const renderEvents = (data: any, i: number) => {
    if (!data || !data?.[i]) {
      return [];
    }

    return Object.entries(data[i])?.map((keyValue: any) => {
      const item: any = keyValue[1];

      return (
        <EventButton
          key={item.event.id}
          event={item.event}
          meta={item.meta}
          type={EVENT_TYPE.MONTH}
          index={i}
        />
      );
    });
  };

  const events: any = renderEvents(monthLayout, index);

  const style: { height: number } = { height: height / 6 - 25 };

  return (
    <div className={'Kalend__MonthWeekRow__container'}>
      <div className={'Kalend__MonthWeekRow__day'}>
        <CalendarHeaderDates calendarDays={days} daysNum={7} />
      </div>
      <div className={'Kalend__MonthWeekRow__container-events'} style={style}>
        {events}
      </div>
      <MonthViewButtonMore calendarDays={days} />
    </div>
  );
};

export default MonthWeekRow;
