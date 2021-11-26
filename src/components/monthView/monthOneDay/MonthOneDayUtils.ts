/**
 * Select classname based on day index position
 * to prevent overlaps of multiple borders
 * @param index
 */
export const getBorderClassName = (index: number): string => {
  if (index < 7) {
    if (index === 6) {
      return 'MonthOneDay__border-bottom';
    } else {
      return 'MonthOneDay__border-bottom-right';
    }
  } else if (index < 35) {
    if (index === 13 || index === 20 || index === 27 || index === 34) {
      return 'MonthOneDay__border-bottom';
    } else {
      return 'MonthOneDay__border-bottom-right';
    }
  } else {
    if (index === 41) {
      return 'MonthOneDay__border';
    } else {
      return 'MonthOneDay__border-right';
    }
  }
};
