import { addDays, parseISO, differenceInCalendarDays } from "date-fns";

export const getWaterStatusColor = (lastWatered, waterNeeds) => {
  if (!lastWatered || !waterNeeds) return "transparent";

  const days = differenceInCalendarDays(
    addDays(parseISO(lastWatered), waterNeeds),
    new Date()
  );

  if (days <= 0 && days >= -3) return "rgba(168, 109, 1, 0.29)";
  if (days <= -4) return "rgba(125, 1, 1, 0.3)"; 
  return "transparent"; 
};