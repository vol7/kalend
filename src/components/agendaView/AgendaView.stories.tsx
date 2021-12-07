import { Story, Meta } from '@storybook/react';
import { CalendarEvent } from '../../common/interface';
import { MissingStory } from '../../utils/storybookHelpers';
import AgendaView from './AgendaView';
import { AgendaViewProps } from './AgendaView.props';

export default {
  title: 'Components/AgendaView/AgendaView',
  component: AgendaView,
} as Meta;

const Template: Story<AgendaViewProps> = () => MissingStory;

export const Primary = Template.bind({});
Primary.args = {
  handleEventClick: (data: CalendarEvent) => alert(data),
};
