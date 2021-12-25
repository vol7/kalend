import { Meta, Story } from '@storybook/react';
import { MissingStory } from '../../../utils/storybookHelpers';
import { MonthViewButtonMoreProps } from './MonthViewButtonMore.props';
import MonthViewButtonMore from './MonthViewButtonMore';

export default {
  title: 'Components/MonthViewButtonMore',
  component: MonthViewButtonMore,
} as Meta;

const Template: Story<MonthViewButtonMoreProps> = () => MissingStory;

export const Primary = Template.bind({});
Primary.args = {};
