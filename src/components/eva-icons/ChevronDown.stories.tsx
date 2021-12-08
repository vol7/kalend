import { Story, Meta } from '@storybook/react';
import ChevronDown from './ChevronDown';

export default {
  title: 'Components/eva-icons/ChevronDown',
  component: ChevronDown,
} as Meta;

const Template: Story = () => <ChevronDown />;

export const Primary = Template.bind({});
Primary.args = {};
