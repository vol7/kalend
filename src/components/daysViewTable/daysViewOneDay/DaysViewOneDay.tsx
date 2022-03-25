import { CalendarEvent } from '../../../common/interface';
import { Context } from '../../../context/store';
import { DateTime } from 'luxon';
import { EVENT_TYPE } from '../../../common/enums';
import { disableTouchDragging } from '../../eventButton/EventButton.utils';
import { formatDateTimeToString, parseCssDark } from '../../../utils/common';
import { getDaysNum } from '../../../utils/calendarDays';
import { useContext, useEffect, useRef, useState } from 'react';
import EventButton from '../../eventButton/EventButton';
import LuxonHelper from '../../../utils/luxonHelper';

// ref to cancel timout
let timeoutRef: any;

const renderEvents = (dataset: any[], day: DateTime) => {
  return dataset.map((eventRaw: any) => {
    const item: CalendarEvent = eventRaw.event;
    return (
      <EventButton
        key={`${item.id}${item.internalID ? item.internalID : ''}`}
        item={eventRaw}
        type={EVENT_TYPE.NORMAL}
        meta={item.meta}
        day={day}
      />
    );
  });
};

interface DaysViewOneDayProps {
  key: string;
  day: DateTime;
  index: number;
  data: any;
}
const DaysViewOneDay = (props: DaysViewOneDayProps) => {
  const { day, index, data } = props;
  const [store] = useContext(Context);
  const { width, selectedView, config, callbacks, isNewEventOpen } = store;
  const { onNewEventClick } = callbacks;
  const { isDark, hourHeight } = config;

  const [offsetTop, setOffsetTop] = useState<any>(null);
  const [offsetTopEnd, setOffsetTopEnd] = useState<any>(null);
  const [startAt, setStartAt] = useState<DateTime | null>(null);
  const [endAt, setEndAt] = useState<DateTime | null>(null);

  const [isDraggingNewEvent, setIsDraggingNewEvent] = useState(false);
  const newEventStartOffset: any = useRef(null);
  const newEventEndOffset: any = useRef(null);
  const startAtRef: any = useRef(null);

  const getHourHeightPartialUnit = () =>
    Number((config.hourHeight / 2).toFixed(0));

  const getDateFromPosition = (value: number): DateTime => {
    let stringValue = String(value);

    stringValue = stringValue.includes('.') ? stringValue : `${stringValue}.0`;

    const [hourStart, minuteStart] = stringValue.split('.');

    return day
      .set({
        hour: Number(hourStart),
        minute: Number(`0.${minuteStart}`) * 60,
        second: 0,
        millisecond: 0,
      })
      .setZone(config.timezone);
  };

  const style: any = {
    position: 'absolute',
    top: offsetTop,
    height: offsetTopEnd - offsetTop,
    background: store.style.primaryColor,
    width: '100%',
    zIndex: 9,
    borderRadius: 8,
    opacity: 0.8,
  };

  const onMove = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (disableTouchDragging(e)) {
      return;
    }

    // Get column element for day, where event is placed
    const dayElement: any = document.getElementById(
      `Kalend__day__${day.toString()}`
    );
    const touches: any = e.nativeEvent?.touches?.[0];
    const dayElementRect = dayElement.getBoundingClientRect();

    let y: number;
    // handle touch movement
    if (touches) {
      y = touches.clientY - dayElementRect.top;
    } else {
      // handle mouse movement
      y = e.clientY - dayElementRect.top;
    }

    if (newEventStartOffset.current === null) {
      const yString = (y / getHourHeightPartialUnit()).toFixed(0).split('.');
      let yValue = Number(yString[0]) * getHourHeightPartialUnit();
      if (Number(yString[1]) > config.hourHeight / 2) {
        yValue = yValue + config.hourHeight / 2;
      }
      setOffsetTop(yValue);
      setOffsetTopEnd(yValue + config.hourHeight / 2);
      newEventStartOffset.current = yValue;
      newEventEndOffset.current = yValue + config.hourHeight / 2;

      const startAtValue = getDateFromPosition(yValue / hourHeight);

      startAtRef.current = startAtValue;
      setStartAt(startAtValue);
      setEndAt(startAtValue.plus({ minute: 30 }));
      return;
    }

    const yStringEndValue = (y / getHourHeightPartialUnit())
      .toFixed(0)
      .split('.');
    let yValueEnd = Number(yStringEndValue[0]) * getHourHeightPartialUnit();
    if (Number(yStringEndValue[1]) > config.hourHeight / 2) {
      yValueEnd = yValueEnd + config.hourHeight / 2;
    }
    const endValueNew = getDateFromPosition(yValueEnd / hourHeight);

    if (endValueNew.minute % 30 !== 0) {
      newEventEndOffset.current = y;
      setOffsetTopEnd(y);
      return;
    }
    // restrict draggable space for timetable
    if (y < config.hourHeight / 2) {
      return;
    }

    newEventEndOffset.current = y;
    setOffsetTopEnd(y);
    setEndAt(endValueNew);
  };

  /**
   * Cancel dragging event
   * remove listeners clean long click timeout and reset state
   * @param event
   */
  const onMouseUp = (event: any) => {
    // clean listeners
    document.removeEventListener('mouseup', onMouseUp, true);
    document.removeEventListener('mousemove', onMove, true);

    // clear timeout
    clearTimeout(timeoutRef);

    // correct layout with actual value from endAt date
    if (endAt) {
      const correctedValue = (endAt.hour + endAt.minute / 60) * hourHeight;
      newEventEndOffset.current = correctedValue;
      setOffsetTopEnd(correctedValue);
    }

    if (onNewEventClick && isDraggingNewEvent) {
      const startValue: number = offsetTop / hourHeight;

      onNewEventClick(
        {
          day: day.toJSDate(),
          hour: startValue,
          event,
          startAt: startAt?.toUTC().toString(),
          endAt: endAt?.toUTC().toString(),
          view: selectedView,
        },
        event
      );
    }
  };

  /**
   * Start event dragging on long press/touch
   * Set listeners
   * @param e
   */
  const onMouseDownLong = (e: any) => {
    if (disableTouchDragging(e)) {
      return;
    }
    setIsDraggingNewEvent(true);
    e.preventDefault();
    e.stopPropagation();

    if (e.button !== 0) return;
    document.addEventListener('mousemove', onMove, true);
    document.addEventListener('mouseup', onMouseUp, true);
  };

  /**
   * Initial long press click/touch on event
   * @param e
   */
  const onMouseDown = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (isDraggingNewEvent) {
      onMouseUp(e);
      return;
    }

    // add timeout to differentiate from normal clicks
    timeoutRef = setTimeout(() => {
      onMouseDownLong(e);
    }, 120);
  };

  const oneDayStyle: any = {
    width: width / getDaysNum(selectedView),
    height: hourHeight * 24,
  };

  const isToday: boolean = LuxonHelper.isToday(day);
  const isFirstDay: boolean = index === 0;
  const dataForDay: any = data;

  const dateNow: any = DateTime.local();

  const nowPosition: number =
    dateNow
      .diff(DateTime.local().set({ hour: 0, minute: 0, second: 0 }), 'minutes')
      .toObject().minutes /
    (60 / hourHeight);

  useEffect(() => {
    if (isToday) {
      const elements: any = document.querySelectorAll(
        '.calendar-body__wrapper'
      );

      for (const element of elements) {
        element.scrollTo({ top: nowPosition - 40, behavior: 'smooth' });
      }
    }
  }, []);

  const handleEventClickInternal = (event: any) => {
    if (isDraggingNewEvent) {
      return;
    }

    if (onNewEventClick) {
      const rect: { top: number } = event.target.getBoundingClientRect();
      const y: number = event.clientY - rect.top;

      const startAtOnClick = getDateFromPosition(
        Number((y / hourHeight).toFixed(0))
      );
      const endAtOnClick = startAtOnClick.plus({ hour: 1 });
      // Get hour from click event
      const hour: number = y / hourHeight;
      onNewEventClick(
        {
          day: day.toJSDate(),
          hour,
          startAt: startAtOnClick?.toUTC().toString(),
          endAt: endAtOnClick?.toUTC().toString(),
          event,
          view: selectedView,
        },
        event
      );
    }
  };

  const handleCloseNewEventDrag = (e?: any) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    setOffsetTopEnd(null);
    setOffsetTop(null);
    setIsDraggingNewEvent(false);
    newEventStartOffset.current = null;
    newEventEndOffset.current = null;
    setStartAt(null);
    setEndAt(null);
  };

  useEffect(() => {
    if (!isNewEventOpen) {
      handleCloseNewEventDrag();
    }
  }, [isNewEventOpen]);

  return (
    <div
      id={`Kalend__day__${day.toString()}`}
      key={day.toString()}
      style={oneDayStyle}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchStart={onMouseDown}
      onTouchMove={onMove}
      onTouchEnd={onMouseUp}
      className={
        !isFirstDay
          ? parseCssDark('Kalend__DayViewOneDay', isDark)
          : 'Kalend__DayViewOneDay'
      }
      onClick={handleEventClickInternal}
    >
      {store.daysViewLayout?.[formatDateTimeToString(day)] &&
      dataForDay &&
      dataForDay.length > 0
        ? renderEvents(dataForDay, day)
        : null}

      {isDraggingNewEvent ? (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'transparent',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 8,
          }}
          onClick={handleCloseNewEventDrag}
        />
      ) : null}
      {isDraggingNewEvent ? (
        <div style={style}>
          <div
            style={{
              paddingTop: 4,
              paddingLeft: 4,
              fontSize: 12,
            }}
          >
            <p style={{ color: 'white' }}>New event</p>
            <p style={{ color: 'white' }}>
              {startAt ? startAt.toFormat('HH:mm') : ''} -{' '}
              {endAt ? endAt.toFormat('HH:mm') : ''}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DaysViewOneDay;
