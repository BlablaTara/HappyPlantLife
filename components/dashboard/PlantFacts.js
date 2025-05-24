export const plantFacts = [
  "at planter kan forbedre din koncentration og produktivitet.",
  "at være omkring planter kan reducere stress og angst.",
  "at nogle planter renser luften for skadelige stoffer.",
  "at passe planter kan forbedre dit humør og velvære.",
  "at planter kan genkende sin ejer.",
  "at planter reagerer på positiv og negativ energi.",
];

export const getRandomFact = () => {
  return plantFacts[Math.floor(Math.random() * plantFacts.length)];
};
