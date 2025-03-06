// This simulates a backend streak service
// In a real application, this would make API calls to your backend
// Mock storage
const streakData = {
  '1': {
    currentStreak: 5,
    lastCompletedDate: '2023-06-09'
  }
};
const getUserId = () => {
  const userData = localStorage.getItem('streak_tracker_user');
  if (userData) {
    return JSON.parse(userData).id;
  }
  return '1'; // Default to demo user
};
export const fetchStreak = async () => {
  // In a real app, this would be an API call
  return new Promise(resolve => {
    setTimeout(() => {
      const userId = getUserId();
      const userStreak = streakData[userId] || {
        currentStreak: 0,
        lastCompletedDate: null
      };
      // Check if streak should be reset (no activity for 2+ days)
      if (userStreak.lastCompletedDate) {
        const lastDate = new Date(userStreak.lastCompletedDate);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - lastDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        // If more than 2 days have passed, reset streak
        if (diffDays > 2) {
          userStreak.currentStreak = 0;
        }
      }
      resolve(userStreak);
    }, 300);
  });
};
export const updateStreak = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      const userId = getUserId();
      const today = new Date().toISOString().split('T')[0];
      if (!streakData[userId]) {
        streakData[userId] = {
          currentStreak: 0,
          lastCompletedDate: null
        };
      }
      const lastDate = streakData[userId].lastCompletedDate;
      if (!lastDate) {
        // First completion
        streakData[userId].currentStreak = 1;
      } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        if (lastDate === yesterdayStr) {
          // Consecutive day
          streakData[userId].currentStreak += 1;
        } else if (lastDate !== today) {
          // Not consecutive and not already completed today
          streakData[userId].currentStreak = 1;
        }
      }
      streakData[userId].lastCompletedDate = today;
      resolve(streakData[userId]);
    }, 300);
  });
};