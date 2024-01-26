export function calculateFlightTime(minutes: number): string {
  const roundedMinutes = Math.round(minutes);

  const flightHours = Math.floor(roundedMinutes / 60);

  const flightMinutes = roundedMinutes % 60;

  const formattedTime = `${flightHours}ч ${flightMinutes}м`;

  return formattedTime;
}
