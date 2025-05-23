export const plantFacts = [
  'At planter kan forbedre din koncentration og produktivitet.',
  'At være omkring planter kan reducere stress og angst.',
  'At nogle planter renser luften for skadelige stoffer.',
  'At passe planter kan forbedre dit humør og velvære.',
  'At planter kan genkende sin ejer.',
  'At planter reagerer på positiv og negativ energi.'
];

export const getRandomFact = () => {
  return plantFacts[Math.floor(Math.random() * plantFacts.length)];
};


