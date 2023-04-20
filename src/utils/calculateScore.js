const calculateScore = (difficulty, timer) => {
  const levels = {
    easy: 1,
    medium: 2,
    hard: 3,
  };
  const WIN_POINTS = 10;

  return WIN_POINTS + (levels[difficulty] * timer);
};

export default calculateScore;
