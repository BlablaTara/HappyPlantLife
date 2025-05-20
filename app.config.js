import 'dotenv/config';

export default {
  expo: {
    name: "HappyPlantLife",
    slug: "HappyPlantLife",
    version: "1.0.0",
    extra: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
    },
  },
};
