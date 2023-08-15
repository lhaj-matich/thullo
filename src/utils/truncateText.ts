export const truncateText = (input: string, max: number) => {
  if (input.length > max) return input.slice(0, max - 3) + "...";
  return input;
};
