import React, { useEffect, useState } from "react";
import { Save, PencilLine } from "lucide-react";
interface NotesWidgetProps {
  note: string;
  date: Date;
  onSaveNote: (content: string) => void;
}
const NotesWidget: React.FC<NotesWidgetProps> = ({
  note,
  date,
  onSaveNote
}) => {
  const [content, setContent] = useState(note);
  const [isSaving, setIsSaving] = useState(false);
  const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout | null>(null);
  useEffect(() => {
    setContent(note);
  }, [note, date]);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }
    const timeout = setTimeout(() => {
      handleSave();
    }, 1000);
    setSaveTimeout(timeout);
  };
  const handleSave = async () => {
    setIsSaving(true);
    await onSaveNote(content);
    setIsSaving(false);
  };
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  };
  return <div className="bg-gradient-to-br from-purple-50 via-white to-purple-50 rounded-xl shadow-lg p-6 h-full border border-purple-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <PencilLine size={20} className="text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-800">Notes</h2>
        </div>
        <span className="text-sm text-purple-600 font-medium">
          {formatDate(date)}
        </span>
      </div>
      <textarea className="w-full h-64 p-4 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none bg-white/50 placeholder-purple-300" placeholder="Write your thoughts, reminders or reflections here..." value={content} onChange={handleChange}></textarea>
      <div className="flex justify-end mt-3">
        <button onClick={handleSave} className="inline-flex items-center text-sm text-purple-600 hover:text-purple-800 font-medium" disabled={isSaving}>
          {isSaving ? <>
              <div className="animate-spin h-4 w-4 border-2 border-purple-600 border-t-transparent rounded-full mr-2"></div>
              Saving...
            </> : <>
              <Save size={16} className="mr-1" />
              {saveTimeout ? "Auto-saving..." : "Saved"}
            </>}
        </button>
      </div>
    </div>;
};
export default NotesWidget;