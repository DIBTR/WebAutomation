import { lastDayOfMonth, getDate } from 'date-fns';

export default (): number | undefined => {
  return getDate(lastDayOfMonth(new Date()));
};
