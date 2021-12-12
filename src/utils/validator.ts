import { CALENDAR_VIEW } from '../common/enums';
import { KalendProps } from '../index';

const getCalendarView = (value: string): CALENDAR_VIEW | null => {
  if (value.toString() === CALENDAR_VIEW.DAY.toString()) {
    return CALENDAR_VIEW.DAY;
  }
  if (value.toString() === CALENDAR_VIEW.THREE_DAYS.toString()) {
    return CALENDAR_VIEW.THREE_DAYS;
  }
  if (value.toString() === CALENDAR_VIEW.WEEK.toString()) {
    return CALENDAR_VIEW.WEEK;
  }
  if (value.toString() === CALENDAR_VIEW.MONTH.toString()) {
    return CALENDAR_VIEW.MONTH;
  }
  if (value.toString() === CALENDAR_VIEW.AGENDA.toString()) {
    return CALENDAR_VIEW.AGENDA;
  }

  return null;
};

export const validateProps = (props: KalendProps): void => {
  // Validate views
  if (props.disabledViews) {
    // throw error if all views are disabled
    if (props.disabledViews.length === Object.values(CALENDAR_VIEW).length) {
      throw Error('[Kalend]: At least one calendar view has to be enabled');
    }
  }

  // validate initial view
  const initialView: CALENDAR_VIEW | null = getCalendarView(
    props.initialView.toString()
  );
  if (!initialView) {
    throw Error(`[Kalend]: Initial view "${props.initialView}" is not valid`);
  }
};

export const validateStyle = (): void => {
  const el: Element | null = document.querySelector('.Kalend__Calendar__root');

  if (el) {
    if (window.getComputedStyle(el).display !== 'flex') {
      throw Error(
        `[Calend]: CSS file not imported. 
         Reason: You probably forgot to import css file in your app as 
         import 'kalend/dist/styles/index.css';
         
         Valid usage: 
         import Kalend from 'kalend';
         import 'kalend/dist/styles/index.css';`
      );
    }
  }
};
