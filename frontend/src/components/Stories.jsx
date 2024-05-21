import { useEffect, useState } from "react"
import storyService from "../services/storyService"
import { dateFormat } from "../utils"
import { useNavigate } from "react-router-dom"
import ConfirmationModal from './ConfirmationModal'

const Stories = () => {
  const [stories, setStories] = useState([])
  const [numToShow, setNumToShow] = useState(5)
  const navigate = useNavigate()
  const [message, setMessage] = useState(null)
  const [modalId, setModalId] = useState(null)

  useEffect(() => {
    storyService.getAll().then((data) => {
      setStories(data.sort((a, b) => b.likes - a.likes))
    })
  }, [])

  const loadMoreStories = () => {
    setNumToShow(numToShow + 5)
  }

  const handleClose = () => {
    setMessage(null)
    setModalId(null)
  }

  const handleDelete = (id, title) => {
    setMessage(`Are you sure you want to delete "${title}"?`)
    setModalId(id)
  }

  const deleteStory = (id) => {
    console.log('delete story', id)
    storyService.remove(id).then(() => {
      setStories(stories.filter(story => story.id !== id))
    })
    handleClose()
  }

  return (
    <div className="mb-20 px-3 mx-auto max-w-screen-xl">
      {modalId && message && <ConfirmationModal message={message} handleClose={handleClose} handleSubmit={() => deleteStory(modalId)} />}
      <h3 className="mt-16 font-serif text-neutral-900 font-semibold text-4xl text-center px-2">Stories</h3>
      <div className="mt-10 font-serif flex items-center justify-center w-full overflow-x-auto border rounded">
        <table className="w-full text-sm text-left text-neutral-500 table-auto">
          <thead className="text-xs text-neutral-700 uppercase bg-neutral-100">
            <tr>
              <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">#</th>
              <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">Created</th>
              <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">Updated</th>
              <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">Preview</th>
              <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">Title</th>
              <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">Author</th>
              <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">Claps</th>
              <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">Comments</th>
              <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">Edit</th>
              <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              stories.slice(0, numToShow).map((story, index) => (
                <tr key={story.id} className="border-t bg-neutral-50">
                  <td className="py-3 px-4 sm:py-4 sm:px-6">{index + 1}</td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6">
                    {dateFormat(story.createdAt)}
                  </td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6">
                    {dateFormat(story.updatedAt)}
                  </td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6">
                    <img className="max-h-16 h-full rounded aspect-video object-cover" src={story.imageUrl} alt="" />
                  </td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6">
                    {story.title}
                  </td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6">
                    {story.authorId ? story.authorId.username : 'dots-user'}
                  </td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6">
                    {story.likes}
                  </td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6">
                    {story.comments.length}
                  </td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6">
                    <button onClick={() => navigate(`/edit-story/${story.id}`)} className="border border-neutral-600 rounded px-2 py-1 text-xs text-neutral-800 hover:bg-neutral-800 hover:text-neutral-50">
                      Edit
                    </button>
                  </td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6">
                    <button onClick={() => handleDelete(story.id, story.title)} className="border border-neutral-600 rounded px-2 py-1 text-xs text-neutral-800 hover:bg-neutral-800 hover:text-neutral-50">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      {
        numToShow < stories.length && (
          <div className="mt-3 flex justify-center">
            <button onClick={loadMoreStories} className="leading-8 font-extralight text-sm font-serif px-3 rounded bg-neutral-900 text-white hover:bg-neutral-600 transition duration-100 ease-in-out">
              Load more
            </button>
          </div>
        )
      }
    </div>
  )
}

export default Stories