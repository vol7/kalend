import { CalendarEvent } from '../../../common/interface';
import { Context } from '../../../context/store';
import { DateTime } from 'luxon';
import { MONTH_EVENT_HEIGHT } from '../../../common/constants';
import { MonthViewButtonMoreProps } from './MonthViewButtonMore.props';
import { formatDateTimeToString } from '../../../utils/common';
import { useContext } from 'react';
import ButtonBase from '../../buttonBase/ButtonBase';
import ShowMoreModal from '../showMoreModal/ShowMoreModal';

const MonthViewButtonMore = (props: MonthViewButtonMoreProps) => {
  const [store, dispatch] = useContext(Context);
  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };

  const { width, monthOverflowEvents, config, showMoreEvents, translations } =
    store;

  const { calendarDays } = props;

  const colWidth: number = width / 7;

  const handleClick = (day: DateTime, events: CalendarEvent[]) => {
    setContext('showMoreEvents', { day, events });
  };

  const renderShowMoreButtons = () => {
    if (!monthOverflowEvents || !calendarDays || calendarDays.length === 0) {
      return [];
    }

    return calendarDays.map((calendarDay: DateTime) => {
      const dateKey = formatDateTimeToString(calendarDay);
      const events: CalendarEvent[] | undefined = monthOverflowEvents[dateKey];

      if (events) {
        return (
          <ButtonBase
            key={calendarDay.toString()}
            className={'Kalend__Monthview_Event'}
            style={{
              width: colWidth,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              // paddingTop: 3,
              // paddingBottom: 3,
              height: MONTH_EVENT_HEIGHT,
            }}
            onClick={() => handleClick(calendarDay, events)}
            isDark={config.isDark}
          >
            <p className={'Kalend__text'} style={{ fontSize: 11 }}>
              {translations['buttons']['showMore']}
            </p>
          </ButtonBase>
        );
      } else {
        return (
          <div
            key={calendarDay.toString()}
            style={{ width: colWidth, visibility: 'hidden' }}
          />
        );
      }
    });
  };

  const showMoreButtons: any = renderShowMoreButtons();

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
      }}
    >
      {showMoreButtons}
      {showMoreEvents ? <ShowMoreModal /> : null}
    </div>
  );
};

export default MonthViewButtonMore;
