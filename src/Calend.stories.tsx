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
  // @ts-ignore
  events: {},
  // eslint-disable-next-line no-console
  onNewEventClick: console.log,
  // eslint-disable-next-line no-console
  onEventClick: console.log,
};
