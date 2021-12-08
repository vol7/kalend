import { Story, Meta } from '@storybook/react';
import { MissingStory } from '../../../../utils/storybookHelpers';
import CalendarHeaderDates from './CalendarHeaderDates';
import { CalendarHeaderDatesProps } from './CalendarHeaderDates.props';

export default {
  title: 'Components/CalendarHeader/components/CalendarHeaderDates',
  component: CalendarHeaderDates,
} as Meta;

const Template: Story<CalendarHeaderDatesProps> = () => MissingStory;

export const Primary = Template.bind({});
Primary.args = {};
