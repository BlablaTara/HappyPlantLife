import { Alert } from "react-native";
import supabase from "../../utils/supabaseConnection";

export const fetchUserPlants = async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    Alert.alert("Ups!", "Du skal være logget ind.");
    return { data: null, error: userError };
  }

  const { data, error } = await supabase
    .from("user_plants")
    .select(`
      id,
      plant_id, 
      last_watered, 
      plants(
        name, 
        water_needs, 
        plant_stages(stage, image))`)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    Alert.alert("Hov!", "Noget gik galt. Prøv igen.");
    return { data: null, error };
  }


  // FLAT MAPPING - skulle være lettere ift. at hente data.
  const formattedPlantData = data.map((item) => ({
    id: item.id,
    plant_id: item.plant_id,
    last_watered: item.last_watered,
    name: item.plants?.name,
    water_needs: item.plants?.water_needs,
    plant_stages: item.plants?.plant_stages,
  }));

  return { data: formattedPlantData };
};
