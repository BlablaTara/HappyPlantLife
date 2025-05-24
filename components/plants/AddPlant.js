import supabase from "../../utils/supabaseConnection.js";
import { Alert } from "react-native";

export const addPlantToUser = async (plantId) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    Alert.alert("Fejl", "Du er ikke logget ind.");
    return false;
  }

  const { data: existing, error: checkError } = await supabase
    .from("user_plants")
    .select("*")
    .eq("user_id", user.id)
    .eq("plant_id", plantId);

  if (checkError) {
    Alert.alert("Hov", "Denne plante har du allerede :)");
    return false;
  }

  if (existing.length > 0) {
    return false;
  }

  const { error } = await supabase.from("user_plants").insert([
    {
      plant_id: plantId,
      user_id: user.id,
      last_watered: new Date().toISOString(),
    },
  ]);

  if (error) {
    Alert.alert("Fejl", "Kunne ikke tilføje plante. Prøv igen.");
    return false;
  } else {
    return true;
  }
};
