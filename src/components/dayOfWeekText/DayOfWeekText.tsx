import { DayOfWeekTextProps } from './DayOfWeekText.props';
import { useTranslation } from 'react-i18next';

const DayOfWeekText = (props: DayOfWeekTextProps) => {
  const { width, day } = props;
  const { t } = useTranslation();

  return (
    <div className={'Kalend__CalendarHeaderWeekDays__col'} style={{ width }}>
      <p className={'Kalend__text Kalend__CalendarHeaderWeekDays__text'}>
        {t(`weekDays:${day.toFormat('EEE')}`)}
      </p>
    </div>
  );
};

export default DayOfWeekText;
