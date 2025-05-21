// components/plants/DeletePlant.js
import supabase from '../../utils/supabaseConnection';

export const deleteUserPlant = async (plantId) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error('Bruger ikke logget ind');
    return false;
  }

  const { error } = await supabase
    .from('user_plants')
    .delete()
    .eq('user_id', user.id)
    .eq('plant_id', plantId);

  if (error) {
    console.error('Fejl ved sletning:', error.message);
    return false;
  }

  return true;
};
