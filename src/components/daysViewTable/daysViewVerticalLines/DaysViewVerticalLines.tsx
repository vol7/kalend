import { CALENDAR_OFFSET_LEFT } from '../../../common/constants';
import { CALENDAR_VIEW } from '../../../common/enums';
import { Context } from '../../../context/store';
import { DateTime } from 'luxon';
import { getCorrectWidth, parseCssDark } from '../../../utils/common';
import { useContext } from 'react';

const renderVerticalLines = (
  calendarDays: DateTime[],
  width: number,
  height: number,
  hourHeight: number,
  isDark: boolean,
  isMobile: boolean
) => {
  const columnWidth: number =
    getCorrectWidth(width, isMobile, CALENDAR_VIEW.WEEK) / calendarDays.length;

  return calendarDays.map((calendarDay, index: number) => {
    const style: { left: number; height: number } = {
      left: columnWidth * index + CALENDAR_OFFSET_LEFT,
      height: hourHeight * 24,
    };

    if (index > 0) {
      return (
        <div
          key={index}
          style={style}
          className={parseCssDark('Kalend__DaysViewVerticalLine__line', isDark)}
        />
      );
    }
  });
};

const DaysViewVerticalLines = () => {
  const [store] = useContext(Context);
  const { calendarDays, width, isDark, height, config, isMobile } = store;

  const verticalLines: any = renderVerticalLines(
    calendarDays,
    width,
    height,
    config.hourHeight,
    isDark,
    isMobile
  );

  return (
    <>
      {/*// <div className={'Kalend__DaysViewVerticalLine__container'}>*/}
      {verticalLines}
      {/*// </div>*/}
    </>
  );
};

export default DaysViewVerticalLines;
