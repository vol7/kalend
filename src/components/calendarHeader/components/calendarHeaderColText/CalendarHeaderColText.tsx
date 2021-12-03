import React from 'react';

interface CalendarHeaderColTextProps {
  children: React.ReactElement;
}
const CalendarHeaderColText = (props: CalendarHeaderColTextProps) => {
  const { children } = props;

  return (
    <div className={'Calend__CalendarHeaderColText__container'}>{children}</div>
  );
};

export default CalendarHeaderColText;
