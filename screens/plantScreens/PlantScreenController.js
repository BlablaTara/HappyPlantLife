import React, { useState, useEffect } from 'react';
import { fetchUserPlants } from '../../components/plants/FetchUserPlants.js';
import ShowPlant from '../../components/plants/ShowPlant.js';
import { deleteUserPlant } from '../../components/plants/DeletePlant.js';

import PlantScreenUI from './PlantScreenUI.js';

const PlantScreenController = () => {
  const [userPlants, setUserPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadPlants = async () => {
    setLoading(true);
    const { data } = await fetchUserPlants();
    if (data) setUserPlants(data);
    setLoading(false);
  };

  useEffect(() => {
    loadPlants();
  }, []);

  console.log("Selected plant:", selectedPlant);


  return (
    <>
      <PlantScreenUI
        userPlants={userPlants}
        setSelectedPlant={setSelectedPlant}
        loading={loading}
        loadPlants={loadPlants}
      />
      <ShowPlant
        visible={!!selectedPlant}
        plant={selectedPlant}
        onClose={() => setSelectedPlant(null)}
        onWatered={async () => {
          await loadPlants();
          const updated = await fetchUserPlants();
          const found = updated.data?.find(p => p.plant_id === selectedPlant.plant_id);
          if (found) {
            setSelectedPlant({
              ...selectedPlant,
              last_watered: found.last_watered
            });
          }
        }}
        onDelete={async () => {
          const success = await deleteUserPlant(selectedPlant.plant_id);
          if (success) {
            await loadPlants();
            setSelectedPlant(null);
          } else {
            console.error("Kunne ikke slette planten");
          }
        }}
      />
    </>
  );
};

export default PlantScreenController;
