const calculateScore = (difficulty, timer) => {
  const levels = {
    easy: 1,
    medium: 2,
    hard: 3,
  };
  const WIN_POINTS = 10;

  console.log(difficulty, 'dificuldade');
  console.log(timer, 'timer');
  console.log(WIN_POINTS, 'win_points');
  console.log(levels[difficulty] * timer);
  return WIN_POINTS + (levels[difficulty] * timer);
};

export default calculateScore;
