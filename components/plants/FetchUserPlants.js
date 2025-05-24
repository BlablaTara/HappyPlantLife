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
    .select("plant_id, last_watered, plants(name, image, water_needs)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    Alert.alert("Hov!", "Noget gik galt. Prøv igen.");
    return { data: null, error };
  }
  return { data };
};
