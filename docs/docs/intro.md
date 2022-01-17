---
sidebar_position: 1
---

# Intro

Kalend - calendar component for React with support for:

- multiple views (day, three days, week, month, agenda)
- events
- drag and drop

### LIVE DEMO: https://demo.kalend.org

### Storybook: https://storybook.kalend.org

## Getting Started


### Install

    npm i kalend

### Usage

    import Kalend, { CalendarView } from 'kalend' // import component
    import 'kalend/dist/styles/index.css'; // import styles

        <Kalend
          onEventClick={onEventClick}
          onNewEventClick={onNewEventClick}
          events={{}}
          initialDate={new Date().toISOString()}
          hourHeight={60}
          initialView={CalendarView.WEEK}
          disabledViews={[CalendarView.DAY]}
          onSelectView={onSelectView}
          selectedView={selectedView}
          onPageChange={onPageChange}
          timeFormat={'24'}
          weekDayStart={'Monday'}
          calendarIDsHidden={['work']}
          language={'en'}
        />

