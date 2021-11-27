import React, { useContext } from 'react';
import './CalendarDesktopNavigation.scss';

import HeaderCalendarTitle from '../headerCalendarTitle/HeaderCalendarTitle';
import { Context } from '../../context/store';
import HeaderCalendarButtons from '../headerCalendarButtons/HeaderCalendarButtons';
import { parseClassName, parseCssDark } from '../../utils/common';
import ButtonIcon from '../buttonIcon/ButtonIcon';
import { EvaIcons } from '../eva-icons';
import { getNewCalendarDays } from '../../utils/getCalendarDays';
import { DateTime } from 'luxon';
import { CALENDAR_VIEW } from '../../common/enums';
import DesktopLayout from '../desktopLayout/DesktopLayout';
import MobileLayout from '../mobileLayout/MobileLayout';
import ButtonBase from '../buttonBase/ButtonBase';
import MobileDropdown from '../mobileDropdown/MobileDropdown';

interface CalendarDesktopNavigationProps {
  disabledViews?: CALENDAR_VIEW[];
  setViewChanged: any;
  disableMobileDropdown?: boolean;
}

/**
 * Title with calendar navigation buttons for desktop layout
 * @param props
 * @constructor
 */
const CalendarDesktopNavigation = (props: CalendarDesktopNavigationProps) => {
  const [store, dispatch] = useContext(Context);
  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };

  const { isDark, calendarDays, selectedView, selectedDate, isMobile } = store;

  const title: string = DateTime.fromISO(selectedDate).toFormat('MMMM');

  const navigateBackwards = async (): Promise<void> =>
    await getNewCalendarDays(calendarDays, selectedView, false, setContext);
  const navigateForward = async (): Promise<void> =>
    await getNewCalendarDays(calendarDays, selectedView, true, setContext);

  const navigateToToday = async (): Promise<void> =>
    await getNewCalendarDays([DateTime.now()], selectedView, false, setContext);

  return (
    <div
      className={parseClassName(
        'CalendarDesktopNavigation__container',
        isMobile,
        isDark
      )}
    >
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <DesktopLayout>
          <div className={'CalendarDesktopNavigation__buttons'}>
            <>
              <ButtonBase
                className={'calendarButtonToday'}
                isDark={isDark}
                onClick={navigateToToday}
              >
                Today
              </ButtonBase>
              <ButtonIcon
                isDark={isDark}
                key={'left'}
                onClick={navigateBackwards}
              >
                <EvaIcons.ChevronLeft
                  className={parseCssDark('icon-svg', isDark)}
                />
              </ButtonIcon>
              <ButtonIcon
                isDark={isDark}
                key={'right'}
                onClick={navigateForward}
              >
                <EvaIcons.ChevronRight
                  className={parseCssDark('icon-svg', isDark)}
                />
              </ButtonIcon>
            </>
          </div>
        </DesktopLayout>
        <HeaderCalendarTitle title={title} />
        <MobileLayout style={{ width: '100%' }}>
          <div className={'CalendarDesktopNavigation__buttons'}>
            <>
              <ButtonIcon
                isDark={isDark}
                key={'left'}
                onClick={navigateBackwards}
              >
                <EvaIcons.ChevronLeft
                  className={parseCssDark('icon-svg', isDark)}
                />
              </ButtonIcon>
              <ButtonIcon
                isDark={isDark}
                key={'right'}
                onClick={navigateForward}
              >
                <EvaIcons.ChevronRight
                  className={parseCssDark('icon-svg', isDark)}
                />
              </ButtonIcon>
              <ButtonIcon
                isDark={isDark}
                key={'calendar'}
                onClick={navigateToToday}
              >
                <EvaIcons.Calendar
                  className={parseCssDark('icon-svg', isDark)}
                />
              </ButtonIcon>
              <MobileDropdown
                disabledViews={props.disabledViews}
                setViewChanged={props.setViewChanged}
                disableMobileDropdown={props.disableMobileDropdown}
              />
            </>
          </div>
        </MobileLayout>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          marginRight: 12,
          justifyContent: 'flex-end',
        }}
      >
        <DesktopLayout>
          <HeaderCalendarButtons
            disabledViews={props.disabledViews}
            setViewChanged={props.setViewChanged}
          />
        </DesktopLayout>
      </div>
    </div>
  );
};

export default CalendarDesktopNavigation;
