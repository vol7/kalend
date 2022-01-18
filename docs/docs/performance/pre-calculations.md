---
sidebar_position: 2
---

# Pre-Calculations

## Basic example for pre-calculations on server

### Client

- on client side access Kalend internal state with callback onStateChange.
- call your server with state data
- save response from kalend-layout library to your app state
- pass layout as eventLayouts prop


    const [eventLayoutState, setEventLayoutState] = useState(null)
    
    const onStateChange = (data) => {
        // call api request with state data from Kalend,
        // which contains required information like width, calendarDays, height, etc...
        const result = await call(data)

        // save result to app state
        setEventLayoutState(result)
    }

      <Kalend
        onEventClick={handleEventClick}
        onNewEventClick={openNewEvent}
        events={eventsRef.current}
        initialDate={new Date().toISOString()}
        hourHeight={settings.hourHeight}
        timeFormat={settings.timeFormat}
        weekDayStart={settings.startOfWeek}
        initialView={initialView}
        onEventDragFinish={onDraggingFinish}
        disabledViews={settings.disabledViews}
        onSelectView={() => {}}
        onPageChange={onPageChange}
        eventLayouts={eventLayoutsState}
        onStateChange={onStateChange}
      />


### Server

- run npm i kalend-layout
- import KalendLayout
- run calculations on request from client and send result back


    import KalendLayout from 'kalend-layout'
    
    const processClientRequest = async (clientStateData) => {
        return KalendLayout({
            events,
            width: clientStateData.width,
            calendarDays: clientStateData.calendarDays,
            config: clientStateData.config,
            maxEventsVisible: clientStateData.maxEventsVisible,
            isMobile: clientStateData.isMobile,
            selectedView: clientStateData.selectedView,
        });
    };
