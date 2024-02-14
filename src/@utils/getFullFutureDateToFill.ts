import { addDays, format } from 'date-fns';
import random from 'lodash/random';

export default (byDays = random(1, 7), pattern = 'MMMM do hh:mm'): string => {
  const workingHours = random(9, 11);
  const futureDate = addDays(new Date().setHours(workingHours), byDays);
  return format(futureDate, pattern);
};
