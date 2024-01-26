interface FlightInfo {
  departureTime: string;
  date: string;
  travelTime: string;
}

interface ArrivalInfo {
  arrivalTime: string;
  arrivalDate: string;
}

function parseTime(timeStr: string): [number, number] {
  const [hoursStr, minutesStr] = timeStr
    .split(':')
    .map(str => str.padStart(2, '0'));
  return [parseInt(hoursStr), parseInt(minutesStr)];
}

export function calculateArrivalTime(flightInfo: FlightInfo): ArrivalInfo {
  const { departureTime, date, travelTime } = flightInfo;

  const [depHours, depMinutes] = parseTime(departureTime);
  const depDateParts = date.split(' ');
  const depDay = parseInt(depDateParts[0]);
  const depMonthAbbreviation = depDateParts[1];

  const [travelHours, travelMinutes] = travelTime
    .split('ч ')
    .map(str => parseInt(str));

  const arrivalMinutes = depMinutes + travelMinutes;
  const arrivalHours = depHours + travelHours + Math.floor(arrivalMinutes / 60);
  const arrivalDay = depDay + Math.floor(arrivalHours / 24);

  const formattedArrivalTime = `${(arrivalHours % 24)
    .toString()
    .padStart(2, '0')}:${(arrivalMinutes % 60).toString().padStart(2, '0')}`;
  const formattedArrivalDate = `${arrivalDay} ${depMonthAbbreviation}`;

  return {
    arrivalTime: formattedArrivalTime,
    arrivalDate: formattedArrivalDate,
  };
}
