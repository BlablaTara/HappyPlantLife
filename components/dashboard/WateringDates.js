export const calculateWateringDates = (userPlants) => {
  const wateringDates = {};

  userPlants.forEach((plant) => {
    const { last_watered, water_needs, plants } = plant;
    const nextWateringDate = new Date(last_watered);
    nextWateringDate.setDate(nextWateringDate.getDate() + water_needs);
    const dateString = nextWateringDate.toISOString().split('T')[0];

    if (!wateringDates[dateString]) {
      wateringDates[dateString] = {
        marked: true,
        dotColor: '#156130',
        plants: [],
      };
    }
    wateringDates[dateString].plants.push(plants.name);
  });

  return wateringDates;
};
