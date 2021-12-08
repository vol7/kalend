import { CalendarDesktopNavigationProps } from './CalendarDesktopNavigation.props';
import { Meta, Story } from '@storybook/react';
import { MissingStory } from '../../utils/storybookHelpers';
import CalendarDesktopNavigation from './CalendarDesktopNavigation';

export default {
  title: 'Components/CalendarDesktopNavigation',
  component: CalendarDesktopNavigation,
} as Meta;

const Template: Story<CalendarDesktopNavigationProps> = () => MissingStory;

export const Primary = Template.bind({});
Primary.args = {};
