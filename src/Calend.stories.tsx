import { Meta, Story } from '@storybook/react';
import Calend, { CalendProps, CalendarView } from './index';

export default {
  title: 'Calend',
  component: Calend,
} as Meta;

const Template: Story<CalendProps> = (args) => (
  <div style={{ height: '100vh' }}>
    <Calend {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  initialView: CalendarView.MONTH,
  events: [],
  onNewEventClick: console.log,
  onEventClick: console.log,
};
