import { useEffect, useState } from "react"
import { useField } from "../hooks"
import topicService from "../services/topicService"
import uploadService from "../services/uploadService"
import { useSelector } from "react-redux"
import storyService from "../services/storyService"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const EditStory = () => {
  const [selectedFile, setSelectedFile] = useState("What about uploading a new preview?")
  const [preview, setPreview] = useState(null)
  const [content, setContent] = useState("")
  const title = useField('text')
  const description = useField('text')
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const [publishing, setPublishing] = useState(false)
  const { id } = useParams();
  const [originalImageUrl, setOriginalImageUrl] = useState(null)
  const [topics, setTopics] = useState([])
  const [topicsChosen, setTopicsChosen] = useState([])

  useEffect(() => {
    topicService.getAll().then((data) => {
      setTopics(data)
    })
    storyService.getOne(id).then((data) => {
      setContent(data.content)
      title.setValue(data.title)
      description.setValue(data.description)
      setOriginalImageUrl(data.imageUrl)
      console.log(data)
      setTopicsChosen(data.topics)
    })
  }, [])

  const publishStory = async () => {
    setPublishing(true)

    let imageUrl = originalImageUrl
    if (preview) {
      const response = await uploadService.uploadImage(preview)
      imageUrl = response.imageUrl
    }

    const updatedStory = {
      title: title.value,
      description: description.value,
      content: content,
      imageUrl: imageUrl,
      topics: topicsChosen.map((topic) => topic.id)
    }

    storyService.update(id, updatedStory, user.token).then((data) => {
      setPublishing(false)
      navigate(`/story/${data.id}`)
    })
  }

  const checkTopic = (id) => {
    const index = topicsChosen.findIndex(topic => topic.id === id)
    if (index === -1) {
      const topic = topics.find(topic => topic.id === id)
      setTopicsChosen([...topicsChosen, topic])
    } else {
      setTopicsChosen(topicsChosen.filter(topic => topic.id !== id))
    }
  }

  const handleQuillOnChange = (content) => {
    setContent(content);
  }

  return (
    <div className="flex flex-col justify-center px-3">
      <h2 className="text-neutral-800 mt-16 mb-12 text-5xl font-bold font-serif text-center">Story Editor</h2>
      <div>
        <input
          {...title.getAttributes()}
          className="text-neutral-800 mb-5 block m-auto w-full max-w-xl sm:max-w-2xl font-serif font-hairline text-lg leading-9 rounded border border-neutral-400 placeholder-neutral-500 bg-transparent px-3 py-1 transition duration-200 ease-in-out focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
          placeholder="Title"
        />
        <textarea
          {...description.getAttributes()}
          className="text-neutral-800 resize-y mb-5 block m-auto w-full max-w-xl sm:max-w-2xl font-serif font-hairline pt-2 leading-7 rounded border border-neutral-400 placeholder-neutral-500 bg-transparent px-3 py-1 transition duration-200 ease-in-out focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
          rows={6}
          placeholder="Description"
        />
        <div className="mb-5 flex items-center m-auto w-full max-w-xl sm:max-w-2xl">
          <input id="image-input" hidden type="file" accept="image/*" onChange={(e) => { setSelectedFile(e.target.files[0].name); setPreview(e.target.files[0]); setOriginalImageUrl(null); }} />
          <label
            htmlFor="image-input"
            className="text-center px-5 transition duration-200 ease-in-out leading-6 font-serif font-medium mr-4 py-2 rounded border-0 text-sm bg-neutral-900 text-white hover:bg-neutral-700 cursor-pointer"
          >
            Story preview
          </label>
          <label className="text-sm font-serif text-neutral-900">{selectedFile}</label>
        </div>
        {
          originalImageUrl &&
          <div>
            <img className="aspect-video w-full object-cover mx-auto max-w-2xl rounded mb-6" src={originalImageUrl} alt="preview" />
          </div>
        }

        {
          preview &&
          <div>
            <img className="aspect-video w-full object-cover mx-auto max-w-2xl rounded mb-6" src={URL.createObjectURL(preview)} alt="preview" />
          </div>
        }

        <div className="max-w-2xl mx-auto mb-5">
          <div className="flex flex-wrap gap-x-6 gap-y-4 justify-center">
            {
              topics.map((topic, index) => (
                <div key={topic.id} className="flex">
                  <input
                    type="checkbox"
                    className="cursor-pointer accent-neutral-900 shrink-0 mt-0.5 border-neutral-300 rounded text-neutral-600 focus:ring-neutral-500 disabled:opacity-50 disabled:pointer-events-none"
                    id={topic.id}
                    value={index}
                    checked={topicsChosen.some(t => t.id === topic.id)}
                    onChange={() => checkTopic(topic.id)}
                  />
                  <label
                    htmlFor={topic.id}
                    className="font-serif text-sm text-neutral-900 ms-2 cursor-pointer"
                  >
                    {topic.name}
                  </label>
                </div>
              ))
            }
          </div>
        </div>

        <div className='flex justify-center mb-12'>
          <ReactQuill value={content} className='w-full max-w-xl sm:max-w-2xl min-h-48 sm:min-h-96' theme="snow" onChange={handleQuillOnChange} />
        </div>
        {
          publishing ? (
            <button onClick={publishStory} disabled className="flex items-center justify-center mt-24 sm:mt-16 mb-10 m-auto w-full max-w-xl sm:max-w-2xl text-center px-5 transition duration-200 ease-in-out leading-6 font-serif font-medium py-2 rounded border-0 text-sm bg-neutral-900 text-white hover:bg-neutral-600">
              <svg aria-hidden="true" className="w-4 h-4 text-neutral-50 animate-spin fill-neutral-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span className="ml-2">Publishing...</span>
            </button>
          ) : (
            <button onClick={publishStory} className="block mt-24 sm:mt-16 mb-10 m-auto w-full max-w-xl sm:max-w-2xl text-center px-5 transition duration-200 ease-in-out leading-6 font-serif font-medium py-2 rounded border-0 text-sm bg-neutral-900 text-white hover:bg-neutral-600">
              Publish
            </button>
          )
        }
      </div>
    </div>
  )
}

export default EditStory
