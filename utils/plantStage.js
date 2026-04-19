import { addDays, parseISO, differenceInCalendarDays } from "date-fns";

export const getPlantStage = (lastWatered, waterNeeds) => {
  if (!lastWatered || !waterNeeds) return "happy";

  const days = differenceInCalendarDays(
    addDays(parseISO(lastWatered), waterNeeds),
    new Date()
  );

  if (days >= 1) return "happy";       
  if (days <= 0 && days >= -3) return "thirsty"; 
  if (days <= -4) return "death";         

  return "happy";
};
