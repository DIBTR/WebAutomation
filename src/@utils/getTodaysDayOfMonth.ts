import { getDate } from 'date-fns';

export default (): number | undefined => {
  return getDate(new Date());
};
