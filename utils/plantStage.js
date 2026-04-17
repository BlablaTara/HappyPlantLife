import { addDays, parseISO, differenceInCalendarDays } from "date-fns";

export const getPlantStage = (lastWatered, waterNeeds) => {
  if (!lastWatered || !waterNeeds) return "healthy";

  const days = differenceInCalendarDays(
    addDays(parseISO(lastWatered), waterNeeds),
    new Date()
  );

  if (days >= 1) return "healthy";       
  if (days <= 0 && days >= -3) return "warning"; 
  if (days <= -4) return "bad";         

  return "healthy";
};
