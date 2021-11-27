// tslint:disable-next-line:cyclomatic-complexity
const Reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'events':
      return {
        ...state,
        events: action.payload,
      };
    case 'initialView':
      return {
        ...state,
        initialView: action.payload,
      };
    case 'selectedView':
      return {
        ...state,
        selectedView: action.payload,
      };
    case 'isMobile':
      return {
        ...state,
        isMobile: action.payload,
      };
    case 'selectedDate':
      return {
        ...state,
        selectedDate: action.payload,
      };
    case 'hourHeight':
      return {
        ...state,
        hourHeight: action.payload,
      };
    case 'calendarDays':
      return {
        ...state,
        calendarDays: action.payload,
      };
    case 'isLoading':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'width':
      return {
        ...state,
        width: action.payload,
      };
    case 'height':
      return {
        ...state,
        height: action.payload,
      };
    case 'isDark':
      return {
        ...state,
        isDark: action.payload,
      };
    case 'headerEventRowsCount':
      return {
        ...state,
        headerEventRowsCount: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
