import supabase from '../../utils/supabaseConnection';

export const fetchUserPlants = async () => {
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error('Bruger ikke logget ind');
    return { data: null, error: userError };
  }

  const { data, error } = await supabase
    .from('user_plants')
    .select('plant_id, last_watered, plants(name, image, water_needs)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Fejl ved hentning af brugerens planter:', error);
    return { data: null, error };
  }

  return { data};
};
