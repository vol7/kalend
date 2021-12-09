import { CalendarHeaderDaysProps } from './CalendarHeaderDays.props';
import { Meta, Story } from '@storybook/react';
import { MissingStory } from '../../../utils/storybookHelpers';
import CalendarHeaderDays from './CalendarHeaderDays';

export default {
  title: 'Components/CalendarHeader/CalendarHeaderDays',
  component: CalendarHeaderDays,
} as Meta;

const Template: Story<CalendarHeaderDaysProps> = () => MissingStory;

export const Primary = Template.bind({});
Primary.args = {};
