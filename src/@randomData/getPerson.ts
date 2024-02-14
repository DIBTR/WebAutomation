import { faker } from '@faker-js/faker/locale/en_GB';

export default (): { firstname: string; lastname: string; fullname: string; email: string; phoneNumber: string } => {
  const firstname = faker.name.firstName();
  const lastname = faker.name.lastName();
  const email = faker.internet.email(firstname, lastname);
  const phoneNumber = faker.phone.number('01865######');
  return {
    firstname,
    lastname,
    fullname: `${firstname} ${lastname}`,
    email,
    phoneNumber,
  };
};
