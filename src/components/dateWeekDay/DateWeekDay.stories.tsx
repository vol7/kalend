import { Story, Meta } from '@storybook/react';
import DateWeekDay from './DateWeekDay';
import { DateTime } from 'luxon';
import { DateWeekDayProps } from './DateWeekDay.props';

export default {
  title: 'Components/DateWeekDay',
  component: DateWeekDay,
} as Meta;

const Template: Story<DateWeekDayProps> = (args) => <DateWeekDay {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isSelected: false,
  width: 20,
  day: DateTime.now().toLocal().toUTC(),
};
