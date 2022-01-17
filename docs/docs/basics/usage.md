---
sidebar_position: 1
---

# Usage

### Install

    npm i kalend

### Example

    import Kalend, { CalendarView } from 'kalend' // import component
    import 'kalend/dist/styles/index.css'; // import styles

        <Kalend
          onEventClick={onEventClick}
          onNewEventClick={onNewEventClick}
          events={[]}
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
