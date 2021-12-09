import { Context } from '../../context/store';
import { HeaderCalendarTitleProps } from './HeaderCalendarTitle.props';
import { parseClassName } from '../../utils/common';
import { useContext } from 'react';

/**
 * Calendar title in header in month date format
 * @param props
 * @constructor
 */
const HeaderCalendarTitle = (props: HeaderCalendarTitleProps) => {
  const { title } = props;

  const [store] = useContext(Context);
  const { isDark, isMobile } = store;

  return (
    <div
      className={parseClassName(
        `Calend__HeaderCalendarTitle__container`,
        isMobile
      )}
    >
      <p
        className={parseClassName(
          'Calend__text Calend__HeaderCalendarTitle',
          isMobile,
          isDark
        )}
      >
        {title}
      </p>
    </div>
  );
};

export default HeaderCalendarTitle;
