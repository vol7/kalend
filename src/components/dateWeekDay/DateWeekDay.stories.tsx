import { DateTime } from 'luxon';
import { DateWeekDayProps } from './DateWeekDay.props';
import { Meta, Story } from '@storybook/react';
import DateWeekDay from './DateWeekDay';

export default {
  title: 'Components/DateWeekDay',
  component: DateWeekDay,
} as Meta;

const Template: Story<DateWeekDayProps> = (args) => <DateWeekDay {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  width: 20,
  day: DateTime.now().toLocal().toUTC(),
};
