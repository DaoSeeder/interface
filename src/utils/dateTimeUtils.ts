export const getTimeRemaining = (date: Date): string => {
  const Difference_In_Time = new Date(date).getTime() - new Date().getTime();
  let time = "Days";
  let Difference_In_Days: number = Difference_In_Time / (1000 * 3600 * 24);
  if (Difference_In_Days < 1) {
    time = "hours";
    Difference_In_Days =
      (new Date(date).getTime() - new Date().getTime()) / (1000 * 3600);
    if (Difference_In_Days < 1) {
      time = "minutes";
      Difference_In_Days =
        (new Date(date).getTime() - new Date().getTime()) / (1000 * 60);
    }
  }
  if (Difference_In_Days <= 0) {
    return "Stage Completed";
  }
  return Difference_In_Days.toFixed(0).toString() + " " + time + " left";
};
