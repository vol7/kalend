import React, { useContext } from 'react';
import './HeaderCalendarButtons.scss';

import { parseCssDark } from '../../utils/common';
import { CALENDAR_VIEW } from '../../common/enums';
import { Context } from '../../context/store';
import ButtonBase from '../buttonBase/ButtonBase';

interface HeaderCalendarButtonProps {
  buttonData: { label: string; value: CALENDAR_VIEW };
  setViewChanged: any;
}
const HeaderCalendarButton = (props: HeaderCalendarButtonProps) => {
  const { buttonData, setViewChanged } = props;

  const [store, dispatch] = useContext(Context);
  const { isDark, calendarDays, selectedView } = store;
  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };

  const isSelected: boolean = buttonData.value === selectedView;
  const buttonClassName = `header_calendar_button${
    isSelected ? '-selected' : ''
  }`;
  const textClassName = `header_calendar_button-text${
    isSelected ? '-selected' : ''
  }`;

  const navigateFunction = (): void => {
    // prevent flickering
    setViewChanged(buttonData.value);
    // setContext('calendarDays', calendarDays[0]);
    // setContext('selectedView', buttonData.value);
  };

  return (
    <ButtonBase
      isDark={isDark}
      className={parseCssDark(buttonClassName, isDark)}
      onClick={navigateFunction}
    >
      <p className={parseCssDark(textClassName, isDark)}>{buttonData.label}</p>
    </ButtonBase>
  );
};

interface HeaderCalendarButtonsProps {
  disabledViews?: CALENDAR_VIEW[];
  setViewChanged: any;
}
/**
 * Buttons for switching calendar view in desktop layout
 * @constructor
 */
const HeaderCalendarButtons = (props: HeaderCalendarButtonsProps) => {
  const { disabledViews, setViewChanged } = props;
  const [store] = useContext(Context);

  const { isDark } = store;

  return disabledViews &&
    disabledViews?.length + 1 === Object.values(CALENDAR_VIEW).length ? null : (
    <div className={parseCssDark('header_calendar_buttons__container', isDark)}>
      {!disabledViews?.includes(CALENDAR_VIEW.AGENDA) ? (
        <HeaderCalendarButton
          buttonData={{ label: 'Agenda', value: CALENDAR_VIEW.AGENDA }}
          setViewChanged={setViewChanged}
        />
      ) : null}
      {!disabledViews?.includes(CALENDAR_VIEW.DAY) ? (
        <HeaderCalendarButton
          buttonData={{ label: 'Day', value: CALENDAR_VIEW.DAY }}
          setViewChanged={setViewChanged}
        />
      ) : null}
      {!disabledViews?.includes(CALENDAR_VIEW.THREE_DAYS) ? (
        <HeaderCalendarButton
          buttonData={{ label: '3 Days', value: CALENDAR_VIEW.THREE_DAYS }}
          setViewChanged={setViewChanged}
        />
      ) : null}
      {!disabledViews?.includes(CALENDAR_VIEW.WEEK) ? (
        <HeaderCalendarButton
          buttonData={{ label: 'Week', value: CALENDAR_VIEW.WEEK }}
          setViewChanged={setViewChanged}
        />
      ) : null}
      {!disabledViews?.includes(CALENDAR_VIEW.MONTH) ? (
        <HeaderCalendarButton
          buttonData={{ label: 'Month', value: CALENDAR_VIEW.MONTH }}
          setViewChanged={setViewChanged}
        />
      ) : null}
    </div>
  );
};

export default HeaderCalendarButtons;
