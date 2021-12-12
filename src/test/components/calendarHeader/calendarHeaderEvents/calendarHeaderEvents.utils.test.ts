import { EventLayout } from '../../../../common/interface';

import assert from 'assert';

import { DateTime } from 'luxon';
import { calculatePositionForHeaderEvents } from '../../../../components/calendarHeader/calendarHeaderEvents/CalendarHeaderEvents.utils';

const event1Data: any = {
  id: '1',
  summary: 'Test 1',
  allDay: true,
  calendarID: '1',
  startAt: `2021-11-08T18:00:00.000Z`,
  endAt: `2021-11-08T22:00:00.000Z`,
  timezoneStart: 'Europe/Berlin',
};
const event2Data: any = {
  id: '2',
  summary: 'Test 2',
  allDay: true,
  calendarID: '1',
  startAt: `2021-11-09T18:00:00.000Z`,
  endAt: `2021-11-09T22:00:00.000Z`,
  timezoneStart: 'Europe/Berlin',
};
const event3Data: any = {
  id: '3',
  summary: 'Test 3',
  allDay: true,
  calendarID: '1',
  startAt: `2021-11-08T18:00:00.000Z`,
  endAt: `2021-11-08T22:00:00.000Z`,
  timezoneStart: 'Europe/Berlin',
};

const getCalendarDays = (): DateTime[] => {
  const result: DateTime[] = [];
  for (let i = 0; i < 7; i += 1) {
    result.push(
      DateTime.fromISO('2021-11-07T18:30:00.000Z').plus({ day: i + 1 })
    );
  }

  return result;
};

describe(`Header events positions`, function () {
  it('Should be full width for each not overlapping event', function () {
    const calendarDays = getCalendarDays();
    const result: EventLayout[] = calculatePositionForHeaderEvents(
      { '2021-11-08': [event1Data], '2021-11-09': [event2Data] },
      120,
      calendarDays
    );

    const event1: EventLayout = result['1'];
    const event2: EventLayout = result['2'];

    // width
    assert.equal(event1.width, 107);
    assert.equal(event2.width, 107);

    // offset left
    assert.equal(event1.offsetLeft, 40);
    assert.equal(event2.offsetLeft, 160);
  });

  it('Should be two overlapping events in one vertical stack', function () {
    const result: EventLayout[] = calculatePositionForHeaderEvents(
      { '2021-11-08': [event1Data, event3Data] },
      120,
      getCalendarDays()
    );

    const event1: EventLayout = result['1'];
    const event2: EventLayout = result['3'];

    // width
    assert.equal(event1.width, 107);
    assert.equal(event2.width, 107);

    // offset left
    assert.equal(event1.offsetLeft, 40);
    assert.equal(event2.offsetLeft, 40);
  });

  it(
    'Should be two overlapping events in one vertical stack and one not' +
      ' overlapping event next to one of them',
    function () {
      const result: EventLayout[] = calculatePositionForHeaderEvents(
        { '2021-11-08': [event1Data, event3Data], '2021-11-09': [event2Data] },
        120,
        getCalendarDays()
      );

      const event1: EventLayout = result['1'];
      const event2: EventLayout = result['2'];
      const event3: EventLayout = result['3'];

      // width
      assert.equal(event1.width, 107);
      assert.equal(event2.width, 107);
      assert.equal(event3.width, 107);

      // offset left
      assert.equal(event1.offsetLeft, 40);
      assert.equal(event2.offsetLeft, 160);
      assert.equal(event3.offsetLeft, 40);
    }
  );
});
