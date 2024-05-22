import { useState } from "react"

const TopicUpdate = ({ defaultValue, onCancel, onSave }) => {
  const [content, setContent] = useState(defaultValue)

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSave(content);
    }
  };

  return (
    <div className='flex'>
      <input
        className="w-28 text-neutral-800 text-xs font-serif font-hairline rounded border border-neutral-400 placeholder-neutral-400 bg-transparent px-3 py-1 transition duration-200 ease-in-out focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
        defaultValue={defaultValue}
        onChange={(e) => setContent(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button className="ml-1 border border-neutral-600 rounded px-2 py-1 text-xs text-neutral-800 hover:bg-neutral-800 hover:text-neutral-50" onClick={() => onSave(content)}>Save</button>
      <button className="ml-1 border border-neutral-600 rounded px-2 py-1 text-xs text-neutral-800 hover:bg-neutral-800 hover:text-neutral-50" onClick={onCancel}>Cancel</button>
    </div>
  )
}

export default TopicUpdate