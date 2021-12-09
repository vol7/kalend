import { CalendarHeaderWeekDaysProps } from './CalendarHeaderWeekDays.props';
import { Meta, Story } from '@storybook/react';
import { MissingStory } from '../../../../utils/storybookHelpers';
import CalendarHeaderWeekDays from './CalendarHeaderWeekDays';

export default {
  title: 'Components/CalendarHeader/components/CalendarHeaderWeekDays',
  component: CalendarHeaderWeekDays,
} as Meta;

const Template: Story<CalendarHeaderWeekDaysProps> = () => MissingStory;

export const Primary = Template.bind({});
Primary.args = {};
