import React, { useContext } from 'react';
import { DateTime } from 'luxon';

import { getBorderClassName } from './MonthOneDayUtils';
import { Context } from '../../../context/store';
import { EVENT_TYPE } from '../../../common/enums';
import EventButton from '../../eventButton/EventButton';
import LuxonHelper from '../../../utils/luxonHelper';
import { parseCssDark } from '../../../utils/common';
import ButtonBase from '../../buttonBase/ButtonBase';
import {
  MONTH_DAY_HEADER_HEIGHT,
  MONTH_EVENT_HEIGHT,
} from '../../../common/constants';
import { MonthOneDayProps } from './MonthOneDay.props';

const DAY_TABLE_WIDTH = '90%';

const MonthOneDay = (props: MonthOneDayProps) => {
  const { index, data, day, handleEventClick, showMoreMonth } = props;

  const [store] = useContext(Context);
  const { isDark, selectedDate, height } = store;

  const renderEvents = (dataset: any) => {
    const tableWidth: string = DAY_TABLE_WIDTH;
    const tableHeight: number = height / 6 - MONTH_DAY_HEADER_HEIGHT; // height of one day
    const maxEvents = Number((tableHeight / MONTH_EVENT_HEIGHT).toFixed(0)) - 1;

    const eventsCount: any = [];

    const handleShowMore = () => {
      if (showMoreMonth) {
        showMoreMonth(dataset);
      }
    };

    if (dataset) {
      return dataset.map((event: any, index: number) => {
        eventsCount.push('one');
        if (eventsCount.length < maxEvents) {
          return (
            <EventButton
              key={event.id}
              eventWidth={tableWidth}
              event={event}
              type={EVENT_TYPE.MONTH}
              handleEventClick={handleEventClick}
              zIndex={2}
            />
          );
        } else if (
          eventsCount.length > maxEvents &&
          index + 1 === dataset.length
        ) {
          return (
            <ButtonBase
              key={day.toString()}
              isDark={isDark}
              className={'Calend__Monthview_Event'}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onClick={handleShowMore}
            >
              <p className={'Calend__text'} style={{ fontSize: 11 }}>
                {eventsCount.length + 1 - maxEvents} more
              </p>
            </ButtonBase>
          );
        }
      });
    }
  };

  const renderDate = (date: DateTime) => {
    const { day } = date;

    if (LuxonHelper.isToday(date)) {
      return (
        <div
          className={parseCssDark(
            'Calend__MonthOneDay__date-container Calend__MonthOneDay__circle-color',
            isDark
          )}
        >
          <p
            className={parseCssDark(
              'Calend__text Calend__MonthOneDay__date-today',
              isDark
            )}
          >
            {day}
          </p>
        </div>
      );
    } else if (date.hasSame(selectedDate, 'month')) {
      return (
        <div className={'Calend__MonthOneDay__date-container'}>
          <p
            className={parseCssDark(
              'Calend__text Calend__MonthOneDay__date',
              isDark
            )}
          >
            {' '}
            {day}
          </p>
        </div>
      );
    } else {
      return (
        <div className={'Calend__MonthOneDay__date-container'}>
          <p
            className={parseCssDark(
              'Calend__text Calend__MonthOneDay__date-past',
              isDark
            )}
          >
            {day}
          </p>
        </div>
      );
    }
  };

  const dataForDay: any = data;
  const events: any = dataForDay ? renderEvents(dataForDay) : null;
  const borderClassName: string = getBorderClassName(index);

  return (
    <div className={borderClassName}>
      <div className={'Calend__MonthOneDay__header-container'}>
        {renderDate(day)}
      </div>
      <div className={'Calend__MonthOneDay__events-container'}>{events}</div>
    </div>
  );
};

export default MonthOneDay;
