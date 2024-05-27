
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const TextEditor = ({ setContent }) => {
  const handleQuillOnChange = (content) => {
    setContent(content);
  }
  return (
    <div className='flex justify-center mb-12'>
      <ReactQuill datatest-id="text-editor-input" className='w-full max-w-xl sm:max-w-2xl min-h-48 sm:min-h-96' theme="snow" onChange={handleQuillOnChange} />
    </div>
  );
}

export default TextEditor