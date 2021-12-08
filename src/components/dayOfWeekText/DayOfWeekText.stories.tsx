import { Story, Meta } from '@storybook/react';
import { MissingStory } from '../../utils/storybookHelpers';
import DayOfWeekText from './DayOfWeekText';
import { DayOfWeekTextProps } from './DayOfWeekText.props';

export default {
  title: 'Components/DayOfWeekText',
  component: DayOfWeekText,
} as Meta;

const Template: Story<DayOfWeekTextProps> = () => MissingStory;

export const Primary = Template.bind({});
Primary.args = {};
