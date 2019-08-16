export function getEventCreationUrl(start, end) {
  const convertToShortReg = /-|:|\.|000/g;

  const startShort = new Date(start).toISOString().replace(convertToShortReg, '');
  const endShort = new Date(end).toISOString().replace(convertToShortReg, '');

  return `https://calendar.google.com/calendar/r/eventedit?` +
    `sprop=name:Nom+de+l'evenement&` +
    `details=Event+created+with+Flash+by+PerfectWeek&` +
    `text=Nom+de+l'evenement&` +
    `dates=${startShort}/${endShort}&sf=true`;
}
