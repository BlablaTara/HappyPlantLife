export const plantFacts = [
  'Planter kan forbedre din koncentration og produktivitet.',
  'At være omkring planter kan reducere stress og angst.',
  'Nogle planter renser luften for skadelige stoffer.',
  'At passe planter kan forbedre dit humør og velvære.',
];

export const getRandomFact = () => {
  return plantFacts[Math.floor(Math.random() * plantFacts.length)];
};


