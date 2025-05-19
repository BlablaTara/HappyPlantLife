import 'dotenv/config';

export default {
  expo: {
    name: "HappyPlantLife",
    slug: "HappyPlantLife",
    version: "1.0.0",
    extra: {
      TREFLE_TOKEN: process.env.TREFLE_TOKEN,
    },
  },
};
