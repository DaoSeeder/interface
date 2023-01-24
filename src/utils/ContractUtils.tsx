export const truncateAddress = (address: string): string => {
  const first = address.substring(0, 5);
  const last = address.substring(address.length - 5);
  return first + "..." + last;
};
