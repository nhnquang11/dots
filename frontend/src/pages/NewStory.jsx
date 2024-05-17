import { useState } from "react"
import TextEditor from "../components/TextEditor"

const NewStory = () => {
  const [selectedFile, setSelectedFile] = useState("Include a high-quality image in your story to make it more inviting to readers.")

  return (
    <div className="flex flex-col justify-center px-3">
      <h2 className="mt-16 mb-12 text-5xl font-bold font-serif text-center">Write a story</h2>
      <div>
        <input className="mb-5 block m-auto w-full max-w-xl sm:max-w-2xl font-serif font-hairline text-lg leading-9 rounded border border-neutral-400 placeholder-neutral-500 bg-transparent px-3 py-1 transition duration-200 ease-in-out focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
          placeholder="Title"
          type="text" />
        <div className="mb-5 flex items-center m-auto w-full max-w-xl sm:max-w-2xl">
          <input id="image-input" hidden type="file" accept="image/*" onChange={(e) => { setSelectedFile(e.target.files[0].name); console.log(e.target.files[0]); }} />
          <label
            htmlFor="image-input"
            className="text-center px-5 transition duration-200 ease-in-out leading-6 font-serif font-medium mr-4 py-2 rounded border-0 text-sm bg-neutral-900 text-white hover:bg-neutral-600 cursor-pointer"
          >
            Upload image
          </label>
          <label className="text-sm font-serif text-neutral-900">{selectedFile}</label>
        </div>
        <TextEditor />
        <button className="block mt-24 sm:mt-16 mb-10 m-auto w-full max-w-xl sm:max-w-2xl text-center px-5 transition duration-200 ease-in-out leading-6 font-serif font-medium py-2 rounded border-0 text-sm bg-neutral-900 text-white hover:bg-neutral-600">
          Publish
        </button>
      </div>
    </div>
  )
}

export default NewStory