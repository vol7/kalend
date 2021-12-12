import { CALENDAR_VIEW } from './common/enums';

import {
  Config,
  OnEventClickFunc,
  OnEventDragFinishFunc,
  OnNewEventClickFunc,
  OnPageChangeFunc,
  OnSelectViewFunc,
  ShowMoreMonthFunc,
} from './common/interface';

export interface CalendarProps {
  config: Config;
  onNewEventClick: OnNewEventClickFunc;
  onEventClick: OnEventClickFunc;
  disabledViews?: CALENDAR_VIEW[];
  onSelectView?: OnSelectViewFunc;
  selectedView?: CALENDAR_VIEW;
  showMoreMonth?: ShowMoreMonthFunc;
  onPageChange?: OnPageChangeFunc;
  onEventDragFinish?: OnEventDragFinishFunc;
  disableMobileDropdown?: boolean;
  timezone?: string;
}
