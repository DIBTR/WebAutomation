import { isEmpty, isNil } from 'ramda';

export default (value: string | undefined | null): boolean => {
  if (isNil(value)) {
    return false;
  }
  return !isEmpty(value);
};
