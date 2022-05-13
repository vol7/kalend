---
sidebar_position: 2
---

# Props

| prop                         | type                                                    | default            | options            | required | desc                                                                            |
|------------------------------|---------------------------------------------------------|--------------------|--------------------|----------|---------------------------------------------------------------------------------|
| `initialDate`                | `string`                                                |                    |                    | false    | starting date for calendar                                                      |
| `initialView`                | `CalendarView - day, three days, week, month`           | CALENDAR_VIEW.WEEK |                    | true     | starts in calendar view                                                         |
| `selectedView`               | `CalendarView`                                          |                    |                    | false    | selected view for control outside of the component                              |
| `disabledViews`              | `CalendarView[]`                                        |                    |                    | false    | disable views you don't need                                                    |
| `hourHeight`                 | `number`                                                | 40                 |                    | false    | height for one hour column in px                                                |
| `events`                     | see example below                                       | []                 |                    | true     | events for calendar                                                             |
| `onNewEventClick`            | `callback func`                                         |                    |                    | false    | callback for clicking on calendar table to create new event                     |
| `onEventClick`               | `callback func`                                         |                    |                    | false    | callback for clicking on event                                                  |
| `onSelectView`               | `callback func`                                         |                    |                    | false    | callback for view change event                                                  |
| `onPageChange`               | `callback func`                                         |                    |                    | false    | callback for navigating through calendar pages                                  |
| `showMoreMonth`              | `callback func`                                         |                    |                    | false    | callback for accessing events which didn't fit in month view                    |
| `disableMobileDropdown`      | `boolean`                                               | false              |                    | false    | disable button for triggering mobile dropdown with views                        |
| `timezone`                   | `string`                                                | system timezone    |                    | false    | IANA timezone format, if not provided, system timezone will be used             |
| `weekDayStart`               | `string`                                                | Monday             | Monday or Sunday   | false    | starting date for week                                                          |
| `timeFormat`                 | `string`                                                | 24                 | 24 or 12           | false    | time format - 24 hours or 12 hours AM/PM                                        |
| `calendarIDsHidden`          | `string[]`                                              |                    |                    | false    | ids in array will be used to filter all events with matchin calendarID property |
| `language`                   | `string`                                                | en                 | en, de, es, fr, ptBR, ru, zh | false    | translate texts to different languages                                          |
| `customLanguage`             | `json`                                                  |                    |  | false    | import your own translation    
| `isNewEventOpen`             | `boolean`                                               |                    |  | false    | show/hide new event dragging element     
| `draggingDisabledConditions` | `object`                                                |                    |  | false    | define rules for disabling event dragging with key value object     
| `showTimeLine`               | `boolean`                                               | false              |  | false    | show timeline representing current time     
`focusHour`               | `number`                                                |               |  | false    | initial focus to hour    
`showWeekNumbers`               | `boolean`                                               |               |  | false    | show week numbers in month and day views    
`autoScroll`               | `boolean`                                               |               |  | false    | scroll to current time on load    
`isDark`               | `boolean`                                               |               |  | false    | set dark theme
`disabledDragging`               | `boolean`                                               |               |  | false    | disable dragging and resizing globally
`colors`               | [see more](https://docs.kalend.org/docs/basics/styling) |               |  | false    | set custom colors for dark/light theme
