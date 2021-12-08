import { CalendarHeaderProps } from './CalendarHeader.props';
import { Meta, Story } from '@storybook/react';
import { MissingStory } from '../../utils/storybookHelpers';
import CalendarHeader from './CalendarHeader';

export default {
  title: 'Components/CalendarHeader/CalendarHeader',
  component: CalendarHeader,
} as Meta;

const Template: Story<CalendarHeaderProps> = () => MissingStory;

export const Primary = Template.bind({});
Primary.args = {};
