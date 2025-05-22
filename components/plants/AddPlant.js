import { Alert } from 'react-native';
import supabase from '../../utils/supabaseConnection.js'

export const addPlantToUser = async (plantId) => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    console.log("User ID:", user.id); //loger

    if (userError || !user) {
      console.error('Bruger ikke logget ind');
      Alert.alert("Fejl", "Du er ikke logget ind.");
      return false;
    }

    console.log('Tilføjer plante:', plantId);

    // Tjek for eksisterende plante
    const { data: existing, error: checkError } = await supabase
      .from('user_plants')
      .select('*')
      .eq('user_id', user.id)
      .eq('plant_id', plantId);

      console.log("Allerede eksisterende:", existing);

    if (checkError) {
      console.error('Fejl ved duplikat-tjek:', checkError.message);
      Alert.alert("Hov", "Denne plante har du allerede :)");
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