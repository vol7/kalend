import { CALENDAR_VIEW } from './common/enums';

import {
  Config,
  OnEventClickFunc,
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
  disableMobileDropdown?: boolean;
  timezone?: string;
}
