export default function createDateObject(dateString: string) {
  const [date, time] = dateString.split(' ');
  const [year, month, day] = date.split('-');
  const [hours, minutes] = time.split(':');
  return new Date(
    parseInt(year, 10),
    parseInt(month, 10),
    parseInt(day, 10),
    parseInt(hours, 10),
    parseInt(minutes, 10)
  );
}
