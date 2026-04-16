export const getPlantStages = (plantStages, stage = "healthy") => {
  if (!plantStages) return null;

  const found = plantStages.find((s) => s.stage === stage);
  return found?.image || null;
};