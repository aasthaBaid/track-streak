import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import StreakDisplay from "../components/StreakDisplay";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import NotesWidget from "../components/NotesWidget";
import { fetchTasks, updateTask, createTask, deleteTask } from "../services/taskService";
import { fetchNotes, updateNote, createNote } from "../services/noteService";
import { fetchStreak, updateStreak } from "../services/streakService";
const Dashboard = () => {
  const {
    user
  } = useAuth();
  const [tasks, setTasks] = useState<any[]>([]);
  const [streak, setStreak] = useState(0);
  const [notes, setNotes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeDate, setActiveDate] = useState(new Date());
  useEffect(() => {
    loadData();
  }, [activeDate]);
  const loadData = async () => {
    setIsLoading(true);
    try {
      const dateStr = activeDate.toISOString().split("T")[0];
      const tasksData = await fetchTasks(dateStr);
      setTasks(tasksData);
      const streakData = await fetchStreak();
      setStreak(streakData.currentStreak);
      const notesData = await fetchNotes(dateStr);
      setNotes(notesData);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const checkAllTasksCompleted = (tasksList: any[]) => {
    return tasksList.length > 0 && tasksList.every(task => task.completed);
  };
  const handleTaskToggle = async (taskId: string, completed: boolean) => {
    try {
      await updateTask(taskId, {
        completed
      });
      // Update local state
      const updatedTasks = tasks.map(task => task.id === taskId ? {
        ...task,
        completed
      } : task);
      setTasks(updatedTasks);
      // Check if all tasks are completed and it's today
      const isToday = new Date().toDateString() === activeDate.toDateString();
      if (isToday && checkAllTasksCompleted(updatedTasks)) {
        // Update streak when all tasks are completed
        const updatedStreak = await updateStreak();
        setStreak(updatedStreak.currentStreak);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  const handleTaskAdd = async (taskName: string) => {
    try {
      const dateStr = activeDate.toISOString().split("T")[0];
      const newTask = await createTask({
        name: taskName,
        date: dateStr,
        completed: false
      });
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  const handleTaskDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  const handleNoteChange = async (content: string) => {
    try {
      const dateStr = activeDate.toISOString().split("T")[0];
      if (notes.length === 0) {
        // Create new note
        const newNote = await createNote({
          content,
          date: dateStr
        });
        setNotes([newNote]);
      } else {
        // Update existing note
        const updatedNote = await updateNote(notes[0].id, {
          content
        });
        setNotes([updatedNote]);
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };
  const handleDateChange = (date: Date) => {
    setActiveDate(date);
  };
  if (isLoading) {
    return <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>;
  }
  return <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <Header username={user?.name} />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <StreakDisplay streak={streak} onDateChange={handleDateChange} activeDate={activeDate} />
            <div className="bg-white rounded-xl shadow-md p-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Daily Tasks
              </h2>
              <TaskForm onAddTask={handleTaskAdd} />
              <TaskList tasks={tasks} onToggleTask={handleTaskToggle} onDeleteTask={handleTaskDelete} />
            </div>
          </div>
          <div>
            <NotesWidget note={notes.length > 0 ? notes[0].content : ""} onSaveNote={handleNoteChange} date={activeDate} />
          </div>
        </div>
      </main>
    </div>;
};
export default Dashboard;