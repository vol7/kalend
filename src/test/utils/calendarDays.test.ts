import {
  calculateMonthDays,
  calculateOneDay,
  getWeekDays,
} from '../../utils/calendarDays';
import { DateTime } from 'luxon';
import { CALENDAR_VIEW } from '../../common/enums';

import assert from 'assert';

describe(`calendarDays funcs`, function () {
  it('calculateOneDay func: forward', function () {
    const refDate: DateTime = DateTime.now();
    assert.equal(
      calculateOneDay(refDate, true).toString(),
      refDate.plus({ days: 1 }).toString()
    );
  });
  it('calculateOneDay func: backwards', function () {
    const refDate: DateTime = DateTime.now();
    assert.equal(
      calculateOneDay(refDate, false).toString(),
      refDate.minus({ days: 1 }).toString()
    );
  });
  it('calculateMonthDays func: current', function () {
    const refDate: DateTime = DateTime.fromISO('2021-11-07T18:40:00.000Z');

    const result: DateTime[] = calculateMonthDays(refDate, undefined, true);

    assert.equal(result[0].toISODate(), '2021-11-01');
    assert.equal(result[result.length - 1].toISODate(), '2021-12-12');
  });
  it('getWeekDays func: Monday', function () {
    const refDate: DateTime = DateTime.fromISO('2021-11-08T18:40:00.000Z');

    const result: DateTime[] = getWeekDays(
      refDate,
      CALENDAR_VIEW.WEEK,
      null,
      false
    );

    assert.equal(result[0].toISODate(), '2021-11-01');
    assert.equal(result[result.length - 1].toISODate(), '2021-11-07');
  });
  it('getWeekDays func: Thursday', function () {
    const refDate: DateTime = DateTime.fromISO('2021-11-11T18:40:00.000Z');

    const result: DateTime[] = getWeekDays(
      refDate,
      CALENDAR_VIEW.WEEK,
      null,
      false
    );

    assert.equal(result[0].toISODate(), '2021-11-08');
    assert.equal(result[result.length - 1].toISODate(), '2021-11-14');
  });
  it('getWeekDays func: Sunday', function () {
    const refDate: DateTime = DateTime.fromISO('2021-11-14T18:40:00.000Z');

    const result: DateTime[] = getWeekDays(
      refDate,
      CALENDAR_VIEW.WEEK,
      null,
      false
    );

    assert.equal(result[0].toISODate(), '2021-11-08');
    assert.equal(result[result.length - 1].toISODate(), '2021-11-14');
  });
});
