
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const TextEditor = () => {
  const [value, setValue] = useState('');
  return (
    <div className='flex justify-center mb-12'>
      <ReactQuill className='w-full max-w-xl sm:max-w-2xl min-h-48 sm:min-h-96' theme="snow" value={value} onChange={setValue} />
    </div>
  );
}

export default TextEditor