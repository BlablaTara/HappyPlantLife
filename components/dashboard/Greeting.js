export const getGreeting = () => {
  const hour = new Date().getHours();
  let timeOfDay;

  if (hour < 12) {
    timeOfDay = 'Go\'morgen';
  } else if (hour < 18) {
    timeOfDay = 'Go\'dag';
  } else {
    timeOfDay = 'Go\'aften';
  }

  const nicknames = ['Solstråle', 'Sukkerært', 'Blomsterbarn', 'Grønne Fingre'];
  const nickname = nicknames[Math.floor(Math.random() * nicknames.length)];

  return `${timeOfDay} ${nickname}!`;

};