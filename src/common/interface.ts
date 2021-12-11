/* eslint-disable @typescript-eslint/no-unused-vars */
import { CALENDAR_VIEW } from './enums';
import { DateTime } from 'luxon';

export interface Settings {
  selectedDate: string;
  selectedView: CALENDAR_VIEW;
  initialView: CALENDAR_VIEW;
  events: any;
  isDark?: boolean;
  hourHeight: number;
}

export interface Config {
  initialDate?: DateTime;
  initialView: CALENDAR_VIEW;
  events: any;
  isDark?: boolean;
  hourHeight?: number;
}

export interface CalendarEvent {
  id: any;
  startAt: string;
  endAt: string;
  timezoneStartAt: string;
  timezoneEndAt: string;
  summary: string;
  color: string;
  [key: string]: any;
}

export interface EventLayoutMeta {
  showTime: boolean;
  isFullWidth: boolean;
  centerText: boolean;
}

export interface NormalEventPosition {
  event: CalendarEvent;
  height: number;
  offsetTop: number;
  width: number;
  offsetLeft: number;
  zIndex: number;
  meta?: EventLayoutMeta;
}

export interface NewEventClickData {
  event: any;
  day: Date;
  hour: number;
}

export interface PageChangeData {
  rangeFrom: string;
  rangeTo: string;
}

export interface EventStyle {
  position: string;
  height: number;
  width: string | number;
  top: number;
  left: number;
  backgroundColor: string;
  transition?: string;
  zIndex?: number;
  border: string;
  alignItems?: string;
}

export interface CalendarDay {
  id: string;
  date: DateTime;
}

// functions
export type OnPageChangeFunc = (data: PageChangeData) => void;
export type ShowMoreMonthFunc = (data: CalendarEvent[]) => void;
export type OnSelectViewFunc = (view: CALENDAR_VIEW) => void;
export type OnEventClickFunc = (data: CalendarEvent) => void;
export type OnEventDragFinishFunc = (data: CalendarEvent) => void;
export type OnNewEventClickFunc = (data: NewEventClickData) => void;
