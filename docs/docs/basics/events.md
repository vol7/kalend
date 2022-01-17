---
sidebar_position: 3
---

# Events

You might need to adjust your events with some properties

    export interface CalendarEvent {
        id: string;
        startAt: string;
        endAt: string;
        timezoneStartAt: string; // optional
        summary: string;
        color: string;
        [key: string]: any;
    }

According to your needs, you can set timezone for each event and also set default timezone with "timezone" prop in IANA format.
If you don't provide timezone prop, your system default timezone will be used.

You can keep other event properties, those will be ignored.

# Events data
Before passing events prop to Kalend, adjust data to this format:
Date key has to be in dd-MM-yyyy format

NOTE: This process will be simplified in future version, so you will just pass array of events and internal logic will handle all required processing 

    const events = {
        '01-11-2021': [
            {
            id: '1',
            startAt: '2021-11-21T18:00:00.000Z',
            endAt: '2021-11-21T19:00:00.000Z',
            timezoneStartAt: 'Europe/Berlin', // optional
            summary: 'test',
            color: 'blue',
            calendarID: 'work'
            }
        ],
        '21-11-2021': [
            {
            id: '2',
            startAt: '2021-11-21T18:00:00.000Z',
            endAt: '2021-11-21T19:00:00.000Z',
            timezoneStartAt: 'Europe/Berlin', // optional
            summary: 'test',
            color: 'blue',
            }
        ]
    }

Group events array under day when they occur and pass starting and ending date in ISO string format in UTC timezone.


