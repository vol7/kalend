import { DayOfWeekTextProps } from './DayOfWeekText.props';

const DayOfWeekText = (props: DayOfWeekTextProps) => {
  const { width, day } = props;

  return (
    <div className={'Kalend__CalendarHeaderWeekDays__col'} style={{ width }}>
      <p className={'Kalend__text Kalend__CalendarHeaderWeekDays__text'}>
        {day.toFormat('EEE')}
      </p>
    </div>
  );
};

export default DayOfWeekText;
