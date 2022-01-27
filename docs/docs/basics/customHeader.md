---
sidebar_position: 7
---

# Custom header

If tou want to replace built in header with controllers, you can modify 

If you would like to use your own calendar header, you can hide built in controls and connect your own components

You can find working example in 
    
    example_app_src/pages/customHeader.tsx

### Usage

Pass ref ```kalendRef``` from ```useRef()``` to Kalend as prop to access navigation functions. 
You will need also pass props ```selectedView``` and ```selectedDate``` to Kalend.

Live example can be found here https://demo.kalend.org/custom

### Example

    const kalendRef: any = useRef();
    
    const [selectedView, setSelectedView] = useState(CALENDAR_VIEW.MONTH);
    const [selectedDate, setSelectedDate] = useState(DateTime.now().toFormat('MM.yyyy'));
    
    const goForward = () => {
        kalendRef?.current?.navigateForward();
    };
    const goBack = () => {
        kalendRef?.current?.navigateBackwards();
    };
    const goToday = () => {
        kalendRef?.current?.navigateToTodayDate();
    };
    
    const onStateChange: OnStateChangeFunc = (state: any) => {
        setSelectedDate(DateTime.fromISO(state.selectedDate).toFormat('MM.yyyy'));
    };

    <Kalend
      kalendRef={props.kalendRef}
      onNewEventClick={onNewEventClick}
      initialView={CalendarView.WEEK}
      disabledViews={[]}
      onEventClick={onEventClick}
      events={demoEvents}
      initialDate={new Date().toISOString()}
      hourHeight={60}
      timezone={'Europe/Berlin'}
      onEventDragFinish={onEventDragFinish}
      onStateChange={props.onStateChange}
      selectedView={props.selectedView}
    />
