import { Story, Meta } from '@storybook/react';
import ChevronRight from './ChevronRight';

export default {
  title: 'Components/eva-icons/ChevronRight',
  component: ChevronRight,
} as Meta;

const Template: Story = () => <ChevronRight />;

export const Primary = Template.bind({});
Primary.args = {};
