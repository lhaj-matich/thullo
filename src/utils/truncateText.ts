export const truncateText = (input: string) => {
  if (input.length > 26) return input.slice(0, 23) + "...";
  return input;
};
