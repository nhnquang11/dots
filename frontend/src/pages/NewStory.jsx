import { useEffect, useState } from "react"
import TextEditor from "../components/TextEditor"
import { useField } from "../hooks"
import topicService from "../services/topicService"
import uploadService from "../services/uploadService"
import { useSelector } from "react-redux"
import storyService from "../services/storyService"

const NewStory = () => {
  const [selectedFile, setSelectedFile] = useState("Include a high-quality image in your story to make it more inviting to readers.")
  const [preview, setPreview] = useState(null)
  const [content, setContent] = useState("")
  const title = useField('text')
  const description = useField('text')
  const [topics, setTopics] = useState([])
  const user = useSelector((state) => state.user)
  const [topicsChecked, setTopicsChecked] = useState([])

  useEffect(() => {
    topicService.getAll().then((data) => {
      setTopics(data)
    }
    )
  }, [])

  const publishStory = async () => {
    console.log(content)

    const response = await uploadService.uploadImage(preview)
    const imageUrl = response.imageUrl

    const story = {
      title: title.value,
      description: description.value,
      content: content,
      imageUrl: imageUrl,
      topics: topicsChecked
    }

    storyService.post(story, user.token).then((data) => {
      console.log(data)
    })
  }

  const checkTopic = (e) => {
    if (e.target.checked) {
      topicsChecked.push(e.target.id)
    } else {
      setTopicsChecked(topicsChecked.filter((topic) => topic !== e.target.id))
    }
  }

  return (
    <div className="flex flex-col justify-center px-3">
      <h2 className="text-neutral-800 mt-16 mb-12 text-5xl font-bold font-serif text-center">Write a story</h2>
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
          <input id="image-input" hidden type="file" accept="image/*" onChange={(e) => { setSelectedFile(e.target.files[0].name); setPreview(e.target.files[0]); console.log(e.target.files[0]); }} />
          <label
            htmlFor="image-input"
            className="text-center px-5 transition duration-200 ease-in-out leading-6 font-serif font-medium mr-4 py-2 rounded border-0 text-sm bg-neutral-900 text-white hover:bg-neutral-700 cursor-pointer"
          >
            Story preview
          </label>
          <label className="text-sm font-serif text-neutral-900">{selectedFile}</label>
        </div>
        {preview &&
          <div>
            <img className="aspect-video w-full object-cover mx-auto max-w-2xl rounded mb-6" src={URL.createObjectURL(preview)} alt="preview" />
          </div>
        }

        <div className="max-w-2xl mx-auto mb-5">
          <div className="flex flex-wrap gap-x-6 gap-y-4 justify-center">
            {
              topics.map((topic) => (
                <div key={topic.id} className="flex">
                  <input
                    type="checkbox"
                    className="cursor-pointer accent-neutral-900 shrink-0 mt-0.5 border-neutral-300 rounded text-neutral-600 focus:ring-neutral-500 disabled:opacity-50 disabled:pointer-events-none"
                    id={topic.id}
                    onChange={checkTopic}
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

        <TextEditor setContent={setContent} />
        <button onClick={publishStory} className="block mt-24 sm:mt-16 mb-10 m-auto w-full max-w-xl sm:max-w-2xl text-center px-5 transition duration-200 ease-in-out leading-6 font-serif font-medium py-2 rounded border-0 text-sm bg-neutral-900 text-white hover:bg-neutral-600">
          Publish
        </button>
      </div>
    </div>
  )
}

export default NewStory