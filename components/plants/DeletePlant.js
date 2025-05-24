import { Alert } from "react-native";
import supabase from "../../utils/supabaseConnection";

export const deleteUserPlant = async (plantId) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    Alert.alert("Ups!", "Du skal være logget ind.")
    return false;
  }

  const { error } = await supabase
    .from("user_plants")
    .delete()
    .eq("user_id", user.id)
    .eq("plant_id", plantId);

  if (error) {
    Alert.alert("Hov!", "Noget gik galt. Prøv igen")
    return false;
  }
  return true;
};
