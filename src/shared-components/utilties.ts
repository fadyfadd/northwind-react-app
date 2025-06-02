function isNumeric(value: any): boolean {
  if (value === null) return false;
  if (value === undefined) return false;
  if (value === "") return false;

  var toStringValue = value.toString();
  var parsedValue = parseFloat(toStringValue);

  return !isNaN(parsedValue);
}

export const utilities = { isNumeric };
