import { Meta, Story } from '@storybook/react';
import ChevronLeft from './ChevronLeft';

export default {
  title: 'Components/eva-icons/ChevronLeft',
  component: ChevronLeft,
} as Meta;

const Template: Story = () => <ChevronLeft />;

export const Primary = Template.bind({});
Primary.args = {};
