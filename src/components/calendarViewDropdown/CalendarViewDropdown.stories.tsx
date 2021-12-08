import { Story, Meta } from '@storybook/react';
import { MissingStory } from '../../utils/storybookHelpers';
import CalendarViewDropdown from './CalendarViewDropdown';
import { CalendarViewDropdownProps } from './CalendarViewDropdown.props';

export default {
  title: 'Components/CalendarViewDropdown',
  component: CalendarViewDropdown,
} as Meta;

const Template: Story<CalendarViewDropdownProps> = () => MissingStory;

export const Primary = Template.bind({});
Primary.args = {};
