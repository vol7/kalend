import { Meta, Story } from '@storybook/react';
import { MissingStory } from '../../../utils/storybookHelpers';
import { MonthOneDayProps } from './MonthOneDay.props';
import MonthOneDay from './MonthOneDay';

export default {
  title: 'Components/MonthOneDay',
  component: MonthOneDay,
} as Meta;

const Template: Story<MonthOneDayProps> = () => MissingStory;

export const Primary = Template.bind({});
Primary.args = {};
