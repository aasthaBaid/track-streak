import React, { useState } from "react";
import { Plus } from "lucide-react";
interface TaskFormProps {
  onAddTask: (name: string) => void;
}
const TaskForm: React.FC<TaskFormProps> = ({
  onAddTask
}) => {
  const [taskName, setTaskName] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskName.trim()) {
      onAddTask(taskName.trim());
      setTaskName("");
    }
  };
  return <form onSubmit={handleSubmit} className="flex items-center mb-4">
      <input type="text" placeholder="Add a new task..." className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" value={taskName} onChange={e => setTaskName(e.target.value)} />
      <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-md flex items-center transition-colors" disabled={!taskName.trim()}>
        <Plus size={18} />
        <span className="ml-1 hidden md:inline">Add</span>
      </button>
    </form>;
};
export default TaskForm;