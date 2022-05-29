export const parseEventString = (
  value: string,
  className: string,
  style: any
) => {
  let newValueString = value;

  if (newValueString.indexOf('\\n') !== -1) {
    newValueString = newValueString.replace(/\\n/g, ' ');
  }

  if (newValueString.indexOf('\\;') !== -1) {
    newValueString = newValueString.replace(/\\;/g, ';');
  }
  if (newValueString.indexOf('\\,') !== -1) {
    newValueString = newValueString.replace(/\\,/g, ',');
  }

  return (
    <p className={className} style={style}>
      {newValueString}
    </p>
  );
};
