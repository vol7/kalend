import { Story, Meta } from '@storybook/react';
import { CalendarEvent } from '../../../common/interface';
import AgendaDayRow from './AgendaDayRow';
import { AgendaDayRowProps } from './AgendaDayRow.props';
import { datatype, lorem, internet } from 'faker';
import { DateTime, Duration } from 'luxon';

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
      summary: lorem.sentence(24, 12),
      color: internet.color(0, 0, 0),
    };
    events.push(event);
  }
  return { day, events };
};

export default {
  title: 'Components/AgendaDayRow',
  component: AgendaDayRow,
} as Meta;

const Template: Story<AgendaDayRowProps> = (args) => <AgendaDayRow {...args} />;

export const Primary = Template.bind({});
const { day, events } = generateCalendarEvents(5);
Primary.args = {
  day,
  events,
  handleEventClick: (data: CalendarEvent) => alert(data),
};
