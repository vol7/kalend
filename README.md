# Calend  - calendar component for React

Support for:
 - day view
 - three days view
 - week view
 - month view

If given interface and controls is not enough for you, you can use callbacks to access internal state and expand functionality to your ui

TODO:
- dragging events
- agenda list view

If you have any suggestion, feel free to open discussion or contact me directly at hello@nibdo.com

# Example
    import Calend from 'calend'

        <Calend
          onEventClick={onEventClick}
          onNewEventClick={onNewEventClick}
          events={[]}
          initialDate={new Date().toISOString()}
          hourHeight={60}
          initialView={CALENDAR_VIEW.WEEK}
          disabledViews={[CALENDAR_VIEW.DAY]}
          onSelectView={onSelectView}
          selectedView={selectedView}
          onPageChange={onPageChange}
        />

# Props

prop      | type             | default     | required      |  desc
----------|-------------|--------|------|--------
`initialDate`   | `string`  | | false | starting date for calendar
`initialView`| `CALENDAR_VIEW - day, three days, week, month` | CALENDAR_VIEW.WEEK | true | starts in calendar view
`selectedView`| `CALENDAR_VIEW` | | false | selected view for control outside of the component
`disabledViews`| `CALENDAR_VIEW[]` | | false| disable views you don't need
`hourHeight`    | `number`   | 40 | false | height for one hour column in px
`events` | `CalendarEvent[]` | [] | true | events for calendar
`onNewEventClick` | `callback func` |  | false | callback for clicking on calendar table to create new event
`onEventClick`   | `callback func`   | | false | callback for clicking on event
`onSelectView` | `callback func` | | false | callback for view change event
`onPageChange` | `callback func` | | false | callback for navigating through calendar pages
`showMoreMonth` | `callback func` | | false | callback for accessing events which didn't fit in month view


# Usage

### Events

Before passing events to calendar, adjust data to this format:

    const events = {
        '21-11-2021': [
            {
            startAt: '2021-11-21T18:00:00.000Z',
            endAt: '2021-11-21T19:00:00.000Z',
            timezoneStartAt: 'Europe/Berlin', // optional
            summary: 'test',
            color: 'blue',
            }
        ]
    }

Group events array under day when they occur and pass starting and ending date in ISO string format. You can keep other event properties, those will be ignored.

## Callbacks
Create functions and handle data from callback in your application

### onNewEventClick
Passing data for creating new event

    interface NewEventClickData {
        event: CalendarEvent;
        day: Date;
        hour: number;
    }

    const onNewEventClick = (data: NewEventClickData) => {
        // do something
    };

### onEventClick
Passing data after clicking on existing event

    interface CalendarEvent {
        startAt: string;
        endAt: string;
        timezoneStartAt?: string;
        timezoneEndAt?: string;
        summary: string;
        color: string;
        [key: string]: any;
    }

    const onEventClick = (data: CalendarEvent) => {
        // do something
    };

### onSelectView

Access current selected view if you want to handle state in your app

    const handleSelectView = (view: CALENDAR_VIEW) => {
        // do something
    }

### onPageChange

Callback to handle actions after page change (going back and forth)

    interface OnPageChangeData {
        rangeFrom: string;
        rangeTo: string;
    }

    const onPageChange = (data: OnPageChangeData) => {
        // do something
    }


### showMoreMonth

Callback returns array of CalendarEvent which did not fit inside day column in month view

    const showMoreMonth = (data: CalendarEvent[]) => {
        // do something
    }
