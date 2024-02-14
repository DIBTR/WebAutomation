import { faker } from '@faker-js/faker/locale/en_GB';

export default (): string => {
  return faker.hacker.phrase();
};
