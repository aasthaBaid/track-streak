// This simulates a backend task service
// In a real application, this would make API calls to your backend
// Mock storage
let tasks: any[] = [{
  id: '1',
  name: 'Complete morning workout',
  completed: true,
  date: '2023-06-10',
  userId: '1'
}, {
  id: '2',
  name: 'Read for 30 minutes',
  completed: false,
  date: '2023-06-10',
  userId: '1'
}, {
  id: '3',
  name: 'Meditate',
  completed: false,
  date: '2023-06-10',
  userId: '1'
}];
const generateId = () => {
  return `task-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};
const getUserId = () => {
  const userData = localStorage.getItem('streak_tracker_user');
  if (userData) {
    return JSON.parse(userData).id;
  }
  return '1'; // Default to demo user
};
export const fetchTasks = async (date: string) => {
  // In a real app, this would be an API call
  return new Promise(resolve => {
    setTimeout(() => {
      const userId = getUserId();
      const userTasks = tasks.filter(task => task.userId === userId && task.date === date);
      resolve(userTasks);
    }, 300);
  });
};
export const createTask = async (taskData: {
  name: string;
  date: string;
  completed: boolean;
}) => {
  // In a real app, this would be an API call
  return new Promise(resolve => {
    setTimeout(() => {
      const userId = getUserId();
      const newTask = {
        id: generateId(),
        ...taskData,
        userId
      };
      tasks.push(newTask);
      resolve(newTask);
    }, 300);
  });
};
export const updateTask = async (taskId: string, updates: any) => {
  // In a real app, this would be an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const taskIndex = tasks.findIndex(task => task.id === taskId);
      if (taskIndex === -1) {
        reject(new Error('Task not found'));
        return;
      }
      tasks[taskIndex] = {
        ...tasks[taskIndex],
        ...updates
      };
      resolve(tasks[taskIndex]);
    }, 300);
  });
};
export const deleteTask = async (taskId: string) => {
  // In a real app, this would be an API call
  return new Promise(resolve => {
    setTimeout(() => {
      tasks = tasks.filter(task => task.id !== taskId);
      resolve(true);
    }, 300);
  });
};