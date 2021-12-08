import { DayOfWeekTextProps } from './DayOfWeekText.props';
import { Meta, Story } from '@storybook/react';
import { MissingStory } from '../../utils/storybookHelpers';
import DayOfWeekText from './DayOfWeekText';

export default {
  title: 'Components/DayOfWeekText',
  component: DayOfWeekText,
} as Meta;

const Template: Story<DayOfWeekTextProps> = () => MissingStory;

export const Primary = Template.bind({});
Primary.args = {};
