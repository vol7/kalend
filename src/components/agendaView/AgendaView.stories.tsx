import { AgendaViewProps } from './AgendaView.props';
import { Meta, Story } from '@storybook/react';
import { MissingStory } from '../../utils/storybookHelpers';
import AgendaView from './AgendaView';

export default {
  title: 'Components/AgendaView/AgendaView',
  component: AgendaView,
} as Meta;

const Template: Story<AgendaViewProps> = () => MissingStory;

export const Primary = Template.bind({});
// Primary.args = {
//   handleEventClick: (data: CalendarEvent) => alert(data),
// };
