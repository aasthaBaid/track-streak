import React from "react";
import { Flame, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
interface StreakDisplayProps {
  streak: number;
  activeDate: Date;
  onDateChange: (date: Date) => void;
}
const StreakDisplay: React.FC<StreakDisplayProps> = ({
  streak,
  activeDate,
  onDateChange
}) => {
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  };
  const handlePrevDay = () => {
    const newDate = new Date(activeDate);
    newDate.setDate(newDate.getDate() - 1);
    onDateChange(newDate);
  };
  const handleNextDay = () => {
    const newDate = new Date(activeDate);
    newDate.setDate(newDate.getDate() + 1);
    if (newDate <= new Date()) {
      onDateChange(newDate);
    }
  };
  const formatDate = (date: Date) => {
    if (isToday(date)) {
      return "Today";
    }
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth() && date.getFullYear() === yesterday.getFullYear()) {
      return "Yesterday";
    }
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric"
    });
  };
  return <div className="bg-gradient-to-br from-indigo-50 via-white to-indigo-50 rounded-xl shadow-lg p-6 border border-indigo-100">
      <div className="flex justify-between items-center mb-6">
        <button onClick={handlePrevDay} className="p-2 rounded-full hover:bg-indigo-100 transition-colors">
          <ChevronLeft size={24} className="text-indigo-600" />
        </button>
        <div className="flex items-center space-x-2">
          <Calendar size={20} className="text-indigo-600" />
          <h2 className="text-xl font-medium text-center text-gray-800">
            {formatDate(activeDate)}
          </h2>
        </div>
        <button onClick={handleNextDay} className={`p-2 rounded-full transition-colors ${isToday(activeDate) ? "text-gray-300 cursor-not-allowed" : "hover:bg-indigo-100 text-indigo-600"}`} disabled={isToday(activeDate)}>
          <ChevronRight size={24} />
        </button>
      </div>
      <div className="flex items-center justify-center">
        <div className="text-center">
          <div className={`inline-flex items-center justify-center rounded-full p-6 mb-4 transform transition-all duration-300 hover:scale-110 ${streak > 0 ? "bg-gradient-to-br from-orange-400 via-red-500 to-purple-500 shadow-lg shadow-orange-200" : "bg-gradient-to-br from-gray-200 to-gray-300"}`}>
            <Flame size={48} className="text-white" />
          </div>
          <div className="mt-2">
            <h3 className="text-4xl font-bold text-gray-800 mb-1">{streak}</h3>
            <p className="text-indigo-600 font-medium">
              Day{streak !== 1 ? "s" : ""} Streak
            </p>
          </div>
        </div>
      </div>
      {!isToday(activeDate) && <div className="mt-6 text-center p-3 bg-indigo-50 rounded-lg">
          <p className="text-sm text-indigo-600">
            You're viewing a past date. Switch to today to update your streak.
          </p>
        </div>}
    </div>;
};
export default StreakDisplay;