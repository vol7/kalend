import React, { useContext, useState } from 'react';
import { Context } from '../../context/store';
import { parseCssDark } from '../../utils/common';
import ButtonIcon from '../buttonIcon/ButtonIcon';
import { EvaIcons } from '../eva-icons';
import HeaderCalendarButtons from '../headerCalendarButtons/HeaderCalendarButtons';
import { CALENDAR_VIEW } from '../../common/enums';

interface MobileDropdownProps {
  disableMobileDropdown?: boolean;
  disabledViews?: CALENDAR_VIEW[];
  setViewChanged: any;
}

const MobileDropdown = (props: MobileDropdownProps) => {
  const { disableMobileDropdown, setViewChanged, disabledViews } = props;

  const [isOpen, setOpen] = useState(false);

  const [store] = useContext(Context);
  const { isDark } = store;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const preventDefault = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return disableMobileDropdown ? null : (
    <>
      <div className={'Calend__MobileDropdown__wrapper'}>
        <ButtonIcon isDark={isDark} key={'calendar'} onClick={handleOpen}>
          <EvaIcons.More className={parseCssDark('icon-svg', isDark)} />
        </ButtonIcon>
        {isOpen ? (
          <div
            className={'Calend__MobileDropdown__backdrop'}
            onClick={handleClose}
          />
        ) : null}
        {isOpen ? (
          <div className={'Calend__MobileDropdown__container'}>
            <div
              className={'Calend__MobileDropdown__container-content'}
              onClick={preventDefault}
            >
              <HeaderCalendarButtons
                disabledViews={disabledViews}
                setViewChanged={setViewChanged}
                handleClose={handleClose}
              />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default MobileDropdown;
