export const getDateDifferenceInSeconds = (date: Date): number => {
  const Difference_In_Time = new Date(date).getTime() - new Date().getTime();
  const Seconds_from_T1_to_T2 = Difference_In_Time / 1000;
  return Math.abs(Seconds_from_T1_to_T2);
};
