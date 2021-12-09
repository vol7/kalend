import { AgendaDayRowProps } from './AgendaDayRow.props';
import { CalendarEvent } from '../../../common/interface';
import { DateTime, Duration } from 'luxon';
import { Meta, Story } from '@storybook/react';
import { datatype, internet, lorem } from 'faker';
import AgendaDayRow from './AgendaDayRow';

const generateCalendarEvents = (
  numberOfEvents: number
): { day: DateTime; events: CalendarEvent[] } => {
  const events = [];
  const day = DateTime.now().toUTC();
  for (let index = 0; index < numberOfEvents; index++) {
    const start = day.plus(
      Duration.fromObject({
        hours: datatype.number({ min: 1, max: 6 }),
        minutes: datatype.number(60),
      })
    );

    const end = day.plus(
      Duration.fromObject({
        hours: datatype.number({ min: 6, max: 12 }),
        minutes: datatype.number(60),
      })
    );

    const event: CalendarEvent = {
      id: datatype.number(),
      startAt: start.toUTC().toISO(),
      timezoneStartAt: '',
      endAt: end.toUTC().toISO(),
      timezoneEndAt: '',
      summary: lorem.sentence(12, 6),
      color: internet.color(0, 0, 0),
    };
    events.push(event);
  }
  return { day, events };
};

export default {
  title: 'Components/AgendaView/AgendaDayRow',
  component: AgendaDayRow,
} as Meta;

const Template: Story<AgendaDayRowProps> = (args) => <AgendaDayRow {...args} />;

export const Primary = Template.bind({});
const { day, events } = generateCalendarEvents(5);
Primary.args = {
  day,
  events,
  handleEventClick: (data: CalendarEvent) => console.log(data),
};
