import { CalendarHeaderColTextProps } from './CalendarHeaderColText.props';
import { Meta, Story } from '@storybook/react';
import { MissingStory } from '../../../../utils/storybookHelpers';
import CalendarHeaderColText from './CalendarHeaderColText';

export default {
  title: 'Components/CalendarHeader/components/CalendarHeaderColText',
  component: CalendarHeaderColText,
} as Meta;

const Template: Story<CalendarHeaderColTextProps> = () => MissingStory;

export const Primary = Template.bind({});
Primary.args = {};
