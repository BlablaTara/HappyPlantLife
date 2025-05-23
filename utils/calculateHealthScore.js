import { parseISO, differenceInCalendarDays } from 'date-fns';

export function getPlantHealthScore(lastWatered, waterNeeds) {
  if (!lastWatered || !waterNeeds) return 0;

  const lastDate = parseISO(lastWatered);
  const daysSinceWatered = differenceInCalendarDays(new Date(), lastDate);
  const score = 1 - daysSinceWatered / waterNeeds;

  return Math.max(0, Math.min(score, 1));
}

export function getOverallHealthScore(plants) {
  if (!plants || plants.length === 0) return 0;

  const scores = plants.map((plant) =>
    getPlantHealthScore(plant.last_watered, plant.plants?.water_needs)
  );

  const total = scores.reduce((sum, s) => sum + s, 0);
  return total / scores.length;
}
