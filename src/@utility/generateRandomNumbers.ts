export default (stringLength: number): string => {
  const possibleChars = '123456789';
  let randomString = '';
  for (let i = 0; i < stringLength; i++) {
    randomString += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
  }
  return randomString;
};
