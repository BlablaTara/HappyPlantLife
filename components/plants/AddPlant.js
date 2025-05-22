export const addPlantToUser = async (plantId) => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error('Bruger ikke logget ind');
      return false;
    }

    console.log('Tilføjer plante:', plantId);

    // Tjek for eksisterende plante
    const { data: existing, error: checkError } = await supabase
      .from('user_plants')
      .select('*')
      .eq('user_id', user.id)
      .eq('plant_id', plantId);

    if (checkError) {
      console.error('Fejl ved duplikat-tjek:', checkError.message);
      return false;
    }

    if (existing.length > 0) {
      console.log('🌱 Planten er allerede tilføjet');
      return false;
    }

    const { error } = await supabase
      .from('user_plants')
      .insert([{ 
        plant_id: plantId, 
        user_id: user.id,
        last_watered: new Date().toISOString() 
      }]);

    if (error) {
      console.error('Fejl ved tilføjelse af plante:', error.message);
      return false;
    } else {
      console.log('✅ Plante tilføjet til brugerens samling!');
      return true;
    }
  };