import { DateTime } from 'luxon';
import { EVENT_TYPE } from '../../../common/enums';
import { OnEventDragFinish } from '../../../index';
import { calculateDaysViewLayout } from '../../../utils/eventLayout';
import { calculatePositionForHeaderEvents } from '../../calendarHeader/calendarHeaderEvents/CalendarHeaderEvents.utils';
import { parseAllDayEvents } from '../../../utils/allDayEvents';

export const onFinishDraggingInternal = (
  eventToUpdate: any,
  store: any,
  setContext: any,
  type: EVENT_TYPE,
  onEventDragFinish: OnEventDragFinish
) => {
  const { events, calendarDays, timezone, width, hourHeight, selectedView } =
    store;

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
      timezone,
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
