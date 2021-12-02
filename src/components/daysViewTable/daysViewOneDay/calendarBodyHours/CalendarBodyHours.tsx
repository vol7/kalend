import React, { useContext } from 'react';
import { parseCssDark } from '../../../../utils/common';
import {
  CALENDAR_OFFSET_LEFT,
  hoursArrayString,
} from '../../../../common/constants';
import { Context } from '../../../../context/store';

const renderHours = (width: number, hourHeight: number, isDark: boolean) =>
  hoursArrayString.map((hour: any) =>
    hour === '00' || hour === '24' ? (
      <div
        key={hour}
        className={'CalendarBodyHours__container'}
        style={{ minHeight: hourHeight }}
      />
    ) : (
      <div
        key={hour}
        className={'CalendarBodyHours__container'}
        style={{ minHeight: hourHeight }}
      >
        <p className={parseCssDark('CalendarBodyHours__text', isDark)}>
          {hour}
        </p>
        <div
          className={parseCssDark('CalendarBodyHours__line', isDark)}
          style={{ width: width - CALENDAR_OFFSET_LEFT }}
        />
      </div>
    )
  );

const CalendarBodyHours = () => {
  const [store] = useContext(Context);
  const { width, height, hourHeight, isDark } = store;

  const hours: any = renderHours(width, hourHeight, isDark);

  return (
    <div className={'CalendarBodyHours__wrapper'} style={{ height }}>
      {hours}
    </div>
  );
};

export default CalendarBodyHours;
