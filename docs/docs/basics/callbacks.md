---
sidebar_position: 4
---

# Callbacks

Create functions and handle data from callback in your application

If you want access to type of callback data, you can import them like this

    import Kalend, {
        OnEventClickData,
        OnNewEventClickData,
        ShowMoreMonthData,
        OnPageChangeData,
        OnSelectViewData
    } from 'kalend';

### onNewEventClick

Passing data for creating new event

    type OnNewEventClickData {
        event: CalendarEvent;
        day: Date;
        hour: number;
        startAt: string;
        endAt: string;
        view: string;
    }

    const onNewEventClick = (data: OnNewEventClickData) => {
        // do something
    };

### onEventClick

Passing data after clicking on existing event

    type OnEventClickData {
        startAt: string;
        endAt: string;
        timezoneStartAt?: string;
        timezoneEndAt?: string;
        summary: string;
        color: string;
        [key: string]: any;
    }

    const onEventClick = (data: OnEventClickData) => {
        // do something
    };

### onSelectView

Access current selected view if you want to handle state in your app

    const handleSelectView = (view: OnSelectViewData) => {
        // do something
    }

### onPageChange

Callback to handle actions after page change (going back and forth)

    const onPageChange = (data: OnPageChangeData) => {
        // do something
    }

### showMoreMonth

Callback returns array of CalendarEvent which did not fit inside day column in month view

    const showMoreMonth = (data: ShowMoreMonthData) => {
        // do something
    }

### onEventDragFinish

    const onEventDragFinish: OnEventDragFinish = (
    prevEvent: CalendarEvent,
    updatedEvent: CalendarEvent,
    events: any
    ) => {
        // if you want just update whole state, you can just set events
        setState(events);
        // OR you can handle logic for updating inside your app with access to "updatedEvent" and "prevEvent"

    };
