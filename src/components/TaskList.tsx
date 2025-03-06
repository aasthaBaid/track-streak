import React from "react";
import { Check, Trash2, ListTodo } from "lucide-react";
interface Task {
  id: string;
  name: string;
  completed: boolean;
}
interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string, completed: boolean) => void;
  onDeleteTask: (id: string) => void;
}
const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleTask,
  onDeleteTask
}) => {
  if (tasks.length === 0) {
    return <div className="text-center py-8">
        <ListTodo size={32} className="mx-auto mb-3 text-indigo-300" />
        <p className="text-gray-500">
          No tasks for today. Add a task to get started!
        </p>
      </div>;
  }
  return <ul className="mt-4 divide-y divide-gray-100">
      {tasks.map(task => <li key={task.id} className="py-3">
          <div className="flex items-center justify-between group">
            <div className="flex items-center">
              <button onClick={() => onToggleTask(task.id, !task.completed)} className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 transition-all duration-200 ${task.completed ? "bg-gradient-to-r from-green-400 to-green-500 border-green-500 scale-110" : "border-gray-300 hover:border-indigo-500 hover:scale-110"}`}>
                {task.completed && <Check size={14} className="text-white" />}
              </button>
              <span className={`transition-all duration-200 ${task.completed ? "text-gray-400 line-through" : "text-gray-700"}`}>
                {task.name}
              </span>
            </div>
            <button onClick={() => onDeleteTask(task.id)} className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
              <Trash2 size={18} />
            </button>
          </div>
        </li>)}
    </ul>;
};
export default TaskList;