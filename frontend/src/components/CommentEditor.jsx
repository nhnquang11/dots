import { useState } from "react"
const CommentEditor = ({ onSave, onCancel, defaultValue }) => {
  const [content, setContent] = useState(defaultValue)

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSave(content);
    }
  };

  return (
    <div>
      <textarea onKeyPress={handleKeyPress} rows={3} onChange={(e) => setContent(e.target.value)} className="bg-neutral-50 w-full border border-neutral-400 rounded-md px-4 py-3 mt-2" value={content}></textarea>
      <button onClick={() => onSave(content)} className="h-8 font-extralight text-sm font-serif px-5 rounded-md bg-neutral-800 text-neutral-50 hover:bg-neutral-700 transition duration-200 ease-in-out">Save</button>
      <button onClick={onCancel} className="ml-1 h-8 font-extralight text-sm font-serif px-4 rounded-md bg-neutral-50 border border-neutral-400 text-neutral-800 hover:bg-neutral-100 transition duration-200 ease-in-out">Cancel</button>
    </div>
  )
}

export default CommentEditor
