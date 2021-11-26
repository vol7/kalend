import './HeaderCalendarTitle.scss';

import React, { useContext } from 'react';
import { Context } from '../../context/store';
import { parseCssDark } from '../../utils/common';
import ButtonBase from '../buttonBase/ButtonBase';

interface HeaderCalendarTitleProps {
  title?: string;
}

/**
 * Calendar title in header in month date format
 * @param props
 * @constructor
 */
const HeaderCalendarTitle = (props: HeaderCalendarTitleProps) => {
  const { title } = props;

  const [store] = useContext(Context);
  const { isDark, selectedView } = store;

  return (
    <div className={`HeaderCalendarTitle__container`}>
      <p className={parseCssDark('HeaderCalendarTitle', isDark)}>{title}</p>
    </div>
  );
};

export default HeaderCalendarTitle;
