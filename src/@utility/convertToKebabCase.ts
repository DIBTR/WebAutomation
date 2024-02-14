export default (data: string): string => {
  const words = data.trim().split(/\s+/);
  const kebabCaseWords = words.map((word) => word.toLowerCase());
  return kebabCaseWords.join('-');
};
