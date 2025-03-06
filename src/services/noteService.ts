// This simulates a backend note service
// In a real application, this would make API calls to your backend
// Mock storage
let notes: any[] = [{
  id: '1',
  content: 'Remember to drink more water today.',
  date: '2023-06-10',
  userId: '1'
}];
const generateId = () => {
  return `note-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};
const getUserId = () => {
  const userData = localStorage.getItem('streak_tracker_user');
  if (userData) {
    return JSON.parse(userData).id;
  }
  return '1'; // Default to demo user
};
export const fetchNotes = async (date: string) => {
  // In a real app, this would be an API call
  return new Promise(resolve => {
    setTimeout(() => {
      const userId = getUserId();
      const userNotes = notes.filter(note => note.userId === userId && note.date === date);
      resolve(userNotes);
    }, 300);
  });
};
export const createNote = async (noteData: {
  content: string;
  date: string;
}) => {
  // In a real app, this would be an API call
  return new Promise(resolve => {
    setTimeout(() => {
      const userId = getUserId();
      const newNote = {
        id: generateId(),
        ...noteData,
        userId
      };
      notes.push(newNote);
      resolve(newNote);
    }, 300);
  });
};
export const updateNote = async (noteId: string, updates: any) => {
  // In a real app, this would be an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const noteIndex = notes.findIndex(note => note.id === noteId);
      if (noteIndex === -1) {
        reject(new Error('Note not found'));
        return;
      }
      notes[noteIndex] = {
        ...notes[noteIndex],
        ...updates
      };
      resolve(notes[noteIndex]);
    }, 300);
  });
};
export const deleteNote = async (noteId: string) => {
  // In a real app, this would be an API call
  return new Promise(resolve => {
    setTimeout(() => {
      notes = notes.filter(note => note.id !== noteId);
      resolve(true);
    }, 300);
  });
};