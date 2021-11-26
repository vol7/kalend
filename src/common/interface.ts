import { CALENDAR_VIEW } from './enums';

export interface Settings {
  selectedDate: string;
  selectedView: CALENDAR_VIEW;
  initialView: CALENDAR_VIEW;
  events: any;
  isDark?: boolean;
  hourHeight: number;
}

export interface Config {
  initialDate?: string;
  initialView: CALENDAR_VIEW;
  events: any;
  isDark?: boolean;
  hourHeight?: number;
}

export interface CalendarEvent {
  startAt: string;
  endAt: string;
  timezoneStartAt: string;
  timezoneEndAt: string;
  summary: string;
  color: string;
  [key: string]: any;
}

export interface NormalEventPosition {
  event: CalendarEvent;
  height: number;
  offsetTop: number;
  width: number;
  offsetLeft: number;
  zIndex: number;
}

export interface NewEventClickData {
  event: any;
  day: Date;
  hour: number;
}

export interface OnPageChangeData {
  rangeFrom: string;
  rangeTo: string;
}
