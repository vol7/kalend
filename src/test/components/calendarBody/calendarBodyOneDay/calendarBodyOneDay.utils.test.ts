import {
  CALENDAR_VIEW,
  TIME_FORMAT,
  WEEKDAY_START,
} from '../../../../common/enums';
import {
  CalendarEvent,
  Config,
  NormalEventPosition,
} from '../../../../common/interface';
import { calculateNormalEventPositions } from '../../../../utils/eventLayout';

import assert from 'assert';

const baseDate = '2021-11-07';

const event1Data: any = {
  id: '1',
  summary: 'Test 1',
  allDay: false,
  calendarID: '1',
  startAt: `${baseDate}T18:00:00.000Z`,
  endAt: `${baseDate}T19:00:00.000Z`,
  timezoneStartAt: 'Europe/Berlin',
};
const event2Data: any = {
  id: '2',
  summary: 'Test 2',
  allDay: false,
  calendarID: '1',
  startAt: `${baseDate}T20:00:00.000Z`,
  endAt: `${baseDate}T21:00:00.000Z`,
  timezoneStartAt: 'Europe/Berlin',
};
const event3Data: any = {
  id: '3',
  summary: 'Test 3',
  allDay: false,
  calendarID: '1',
  startAt: `${baseDate}T15:00:00.000Z`,
  endAt: `${baseDate}T18:30:00.000Z`,
  timezoneStartAt: 'Europe/Berlin',
};
const event4Data: any = {
  id: '4',
  summary: 'Test 4',
  allDay: false,
  calendarID: '1',
  startAt: `${baseDate}T05:00:00.000Z`,
  endAt: `${baseDate}T06:00:00.000Z`,
  timezoneStartAt: 'Europe/Berlin',
};
const BASE_WIDTH = 500;
const TIMEZONE = 'Europe/Berlin';

const createConfigMock = (): Config => {
  return {
    disableMobileDropdown: false,
    hourHeight: 40,
    isDark: false,
    timeFormat: TIME_FORMAT.H_24,
    timezone: TIMEZONE,
    weekDayStart: WEEKDAY_START.MONDAY,
  };
};

describe(`Calendar Body One day normal event positions`, function () {
  // eslint-disable-next-line no-undef
  process.env.TZ = 'Europe/Berlin';

  it('Should be full width for each not overlapping event', function () {
    const data: any = [event1Data, event2Data] as CalendarEvent[];
    const result: NormalEventPosition[] = calculateNormalEventPositions(
      data,
      BASE_WIDTH,
      createConfigMock(),
      CALENDAR_VIEW.WEEK,
      '12'
    );

    const event1: NormalEventPosition = result[0];
    const event2: NormalEventPosition = result[1];

    assert.equal(result.length, 2);

    // height
    assert.equal(event1.height, 40);
    assert.equal(event2.height, 40);

    // width
    assert.equal(event1.width, 66);
    assert.equal(event2.width, 66);

    // offset left
    assert.equal(event1.offsetLeft, 0);
    assert.equal(event2.offsetLeft, 0);

    // offset top
    assert.equal(event1.offsetTop, 760);
    assert.equal(result[1].offsetTop, 840);
  });

  it('Should get correct layout for two overlapping events', function () {
    const data: any = [event1Data, event3Data] as CalendarEvent[];
    const result: NormalEventPosition[] = calculateNormalEventPositions(
      data,
      BASE_WIDTH,
      createConfigMock(),
      CALENDAR_VIEW.WEEK,
      '12'
    );

    const event1: NormalEventPosition = result[0];
    const event2: NormalEventPosition = result[1];

    assert.equal(result.length, 2);

    // height
    assert.equal(event1.height, 40);
    assert.equal(event2.height, 140);

    // width
    assert.equal(event1.width, 36);
    assert.equal(event2.width, 36);

    // offset left
    assert.equal(event1.offsetLeft, 0);
    assert.equal(event2.offsetLeft, 30);

    // offset top
    assert.equal(event1.offsetTop, 760);
    assert.equal(event2.offsetTop, 640);
  });

  it(
    'Should get correct layout for two overlapping events and one full' +
      ' width event',
    function () {
      const data: any = [event1Data, event3Data, event4Data] as CalendarEvent[];
      const result: NormalEventPosition[] = calculateNormalEventPositions(
        data,
        BASE_WIDTH,
        createConfigMock(),
        CALENDAR_VIEW.WEEK,
        '12'
      );

      const event1: NormalEventPosition = result[0];
      const event2: NormalEventPosition = result[1];
      const event3: NormalEventPosition = result[2];

      assert.equal(result.length, 3);

      // height
      assert.equal(event1.height, 40);
      assert.equal(event2.height, 140);
      assert.equal(event3.height, 40);

      // width
      assert.equal(event1.width, 36);
      assert.equal(event2.width, 36);
      assert.equal(event3.width, 66);

      // offset left
      assert.equal(event1.offsetLeft, 0);
      assert.equal(event2.offsetLeft, 30);
      assert.equal(event3.offsetLeft, 0);

      // offset top
      assert.equal(event1.offsetTop, 760);
      assert.equal(event2.offsetTop, 640);
      assert.equal(event3.offsetTop, 240);
    }
  );
});
