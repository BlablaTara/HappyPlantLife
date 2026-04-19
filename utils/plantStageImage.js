export const getPlantStageImage = (plant, stage = "happy") => {
  return plant?.plant_stages?.find((s) => s.stage === stage)?.image || null;
};