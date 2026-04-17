export const getPlantStageImage = (plant, stage = "healthy") => {
  return plant?.plant_stages?.find((s) => s.stage === stage)?.image || null;
};