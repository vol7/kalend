import { Meta, Story } from '@storybook/react';
import CalendarIcon from './CalendarIcon';

export default {
  title: 'Components/eva-icons/CalendarIcon',
  component: CalendarIcon,
} as Meta;

const Template: Story = () => <CalendarIcon />;

export const Primary = Template.bind({});
Primary.args = {};
