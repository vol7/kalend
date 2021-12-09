import { CalendarViewDropdownProps } from './CalendarViewDropdown.props';
import { Context } from '../../context/store';
import { EvaIcons } from '../eva-icons';
import { parseCalendarViewToText, parseCssDark } from '../../utils/common';
import { useContext, useState } from 'react';
import ButtonBase from '../buttonBase/ButtonBase';
import ButtonIcon from '../buttonIcon/ButtonIcon';
import HeaderCalendarButtons, {
  isSingleView,
} from '../headerCalendarButtons/HeaderCalendarButtons';

const CalendarViewDropdown = (props: CalendarViewDropdownProps) => {
  const { disableMobileDropdown, setViewChanged, disabledViews } = props;

  const [isOpen, setOpen] = useState(false);

  const [store] = useContext(Context);
  const { isDark, isMobile, selectedView } = store;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const preventDefault = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (isMobile && (disableMobileDropdown || isSingleView(disabledViews))) ||
    isSingleView(disabledViews) ? null : (
    <>
      <div className={'Calend__CalendarViewDropdown__wrapper'}>
        {isMobile ? (
          <ButtonIcon isDark={isDark} key={'calendar'} onClick={handleOpen}>
            <EvaIcons.More className={parseCssDark('icon-svg', isDark)} />
          </ButtonIcon>
        ) : (
          <ButtonBase
            isDark={isDark}
            className={'Calend__ButtonBase-border'}
            onClick={handleOpen}
            text={parseCalendarViewToText(selectedView)}
          />
        )}
        {isOpen ? (
          <div
            className={'Calend__CalendarViewDropdown__backdrop'}
            onClick={handleClose}
          />
        ) : null}
        {isOpen ? (
          <div className={'Calend__CalendarViewDropdown__container'}>
            <div
              className={'Calend__CalendarViewDropdown__container-content'}
              onClick={preventDefault}
            >
              <HeaderCalendarButtons
                disabledViews={disabledViews}
                setViewChanged={setViewChanged}
                handleClose={handleClose}
                isForcedMobile={true}
              />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default CalendarViewDropdown;
