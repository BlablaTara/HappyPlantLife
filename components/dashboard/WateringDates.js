export const calculateWateringDates = (userPlants) => {
  const wateringDates = {};
  const today = new Date();

  userPlants.forEach((plant) => {
    const { last_watered, plants } = plant;
    const water_needs = plants?.water_needs;

    if (!last_watered || !water_needs) return;

    const nextWateringDate = new Date(last_watered);
    nextWateringDate.setDate(nextWateringDate.getDate() + water_needs);

    const dateString = nextWateringDate.toISOString().split("T")[0];
    const isOverdue = nextWateringDate < today;

    wateringDates[dateString] = wateringDates[dateString] || {
      marked: true,
      dotColor: isOverdue ? "red" : "#156130",
      plants: [],
    };

    wateringDates[dateString].plants.push(plants.name);
  });

  return wateringDates;
};
