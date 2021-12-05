import assert from 'assert';
import { DateTime } from 'luxon';

import { navigateToToday } from '../../utils/getCalendarDays';
import { CALENDAR_VIEW } from '../../common/enums';

describe(`getCalendarDays funcs`, function () {
  it('navigateToToday func: AGENDA', async function () {
    let result: DateTime | undefined;

    const setContextMockFunc: any = (key: any, value: any): void => {
      result = value;
    };

    await navigateToToday(
      CALENDAR_VIEW.AGENDA,
      setContextMockFunc,
      DateTime.fromISO('2021-12-05T05:00:00.000Z')
    );

    assert.equal(result?.year, 2021);
    assert.equal(result?.month, 12);
    assert.equal(result?.day, 16);
  });
  it('navigateToToday func: DAY', async function () {
    let result: DateTime | undefined;

    const setContextMockFunc: any = (key: any, value: any): void => {
      result = value;
    };

    await navigateToToday(
      CALENDAR_VIEW.DAY,
      setContextMockFunc,
      DateTime.fromISO('2021-12-05T05:00:00.000Z')
    );

    assert.equal(result?.year, 2021);
    assert.equal(result?.month, 12);
    assert.equal(result?.day, 5);
  });
  it('navigateToToday func: 3 DAYS', async function () {
    let result: DateTime | undefined;

    const setContextMockFunc: any = (key: any, value: any): void => {
      result = value;
    };

    await navigateToToday(
      CALENDAR_VIEW.THREE_DAYS,
      setContextMockFunc,
      DateTime.fromISO('2021-12-06T05:00:00.000Z')
    );

    assert.equal(result?.year, 2021);
    assert.equal(result?.month, 12);
    assert.equal(result?.day, 6);
  });
  it('navigateToToday func: WEEK', async function () {
    let result: DateTime | undefined;

    const setContextMockFunc: any = (key: any, value: any): void => {
      result = value;
    };

    await navigateToToday(
      CALENDAR_VIEW.WEEK,
      setContextMockFunc,
      DateTime.fromISO('2021-12-15T05:00:00.000Z')
    );

    assert.equal(result?.year, 2021);
    assert.equal(result?.month, 12);
    assert.equal(result?.day, 15);
  });
  it('navigateToToday func: WEEK', async function () {
    let result: DateTime | undefined;

    const setContextMockFunc: any = (key: any, value: any): void => {
      result = value;
    };

    await navigateToToday(
      CALENDAR_VIEW.WEEK,
      setContextMockFunc,
      DateTime.fromISO('2021-12-16T05:00:00.000Z')
    );

    assert.equal(result?.year, 2021);
    assert.equal(result?.month, 12);
    assert.equal(result?.day, 15);
  });
  it('navigateToToday func: MONTH', async function () {
    let result: DateTime | undefined;

    const setContextMockFunc: any = (key: any, value: any): void => {
      result = value;
    };

    await navigateToToday(
      CALENDAR_VIEW.MONTH,
      setContextMockFunc,
      DateTime.fromISO('2021-12-16T05:00:00.000Z')
    );

    assert.equal(result?.year, 2021);
    assert.equal(result?.month, 12);
    assert.equal(result?.day, 14);
  });
});
