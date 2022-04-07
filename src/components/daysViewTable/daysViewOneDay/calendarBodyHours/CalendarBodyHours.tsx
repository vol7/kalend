import { CALENDAR_OFFSET_LEFT } from '../../../../common/constants';
import { Context } from '../../../../context/store';
import { TIME_FORMAT } from '../../../../common/enums';
import { createVerticalHours, parseCssDark } from '../../../../utils/common';
import { useContext } from 'react';

const renderHours = (
  width: number,
  hourHeight: number,
  isDark: boolean,
  timeFormat: TIME_FORMAT
) =>
  createVerticalHours(timeFormat).map((hour: any) =>
    hour === '00' || hour === '24' ? (
      <div
        key={hour}
        className={'Kalend__CalendarBodyHours__container'}
        style={{ minHeight: hourHeight }}
      />
    ) : (
      <div
        key={hour}
        className={'Kalend__CalendarBodyHours__container'}
        style={{ minHeight: hourHeight }}
      >
        <p
          className={parseCssDark(
            'Kalend__text Kalend__CalendarBodyHours__text',
            isDark
          )}
          style={{
            top: parseInt(hour) * hourHeight - 4,
            left: 10,
          }}
        >
          {hour}
        </p>
        <div
          className={parseCssDark(
            'Kalend__text Kalend__CalendarBodyHours__line',
            isDark
          )}
          style={{ width: width - CALENDAR_OFFSET_LEFT }}
        />
      </div>
    )
  );

const CalendarBodyHours = () => {
  const [store] = useContext(Context);
  const { width, config, isDark, height } = store;
  const { hourHeight, timeFormat } = config;

  const hours: any = renderHours(width, hourHeight, isDark, timeFormat);

  return (
    <div className={'Kalend__CalendarBodyHours__wrapper'} style={{ height }}>
      {hours}
    </div>
  );
};

export default CalendarBodyHours;
