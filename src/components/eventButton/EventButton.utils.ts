import { CalendarEvent, EventLayout } from '../../common/interface';
import { DateTime } from 'luxon';
import { EVENT_TYPE } from '../../common/enums';
import { MONTH_EVENT_HEIGHT } from '../../common/constants';
import { formatDateTimeToString } from '../../utils/common';

export const createTempMonthEventsLayout = (): EventLayout => {
  return {
    offsetLeft: 0,
    offsetTop: 0,
    width: '90%',
    height: MONTH_EVENT_HEIGHT,
    zIndex: 1,
    border: 'none',
    meta: {
      showTime: false,
      isFullWidth: true,
      centerText: true,
    },
  };
};

export interface EventButtonInitialState {
  dragging: boolean;
  initialTop: number;
  initialLeft: number;
  offsetTop: number;
  offsetLeft: number;
  xPosition: number;
  eventHasChanged: boolean;
  width: number;
  height: number;
  zIndex: number;
  border: string;
  meta: any;
}

export const eventButtonInitialState: EventButtonInitialState = {
  dragging: false,
  initialTop: 0,
  initialLeft: 0,
  offsetTop: 0,
  offsetLeft: 0,
  xPosition: 0,
  eventHasChanged: false,
  width: 0,
  height: 0,
  zIndex: 2,
  border: '',
  meta: {},
};

export const initEventButtonPosition = (
  type: EVENT_TYPE,
  day: DateTime | undefined,
  event: CalendarEvent,
  store: any,
  setLayout: any
) => {
  const { daysViewLayout, headerLayout } = store;

  if (type === EVENT_TYPE.NORMAL && day) {
    const formattedDayString: string = formatDateTimeToString(day);
    const eventLayoutValue: any =
      daysViewLayout[formattedDayString]?.[event.id];
    if (eventLayoutValue) {
      setLayout(eventLayoutValue);
    }
  } else if (type === EVENT_TYPE.HEADER) {
    if (store.headerLayout) {
      const headerLayoutValue: any = headerLayout[event.id];
      if (headerLayoutValue) {
        setLayout(headerLayoutValue);
      }
    }
  } else {
    setLayout(createTempMonthEventsLayout());
  }
};
