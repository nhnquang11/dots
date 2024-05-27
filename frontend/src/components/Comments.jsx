import { useEffect, useState } from "react"
import commentService from "../services/commentService"
import { dateFormat } from "../utils"
import ConfirmationModal from './ConfirmationModal'
import { useNavigate } from "react-router-dom"
import Notification from "./Notification"
import { newestToOldest } from "../utils"
import { useSelector } from "react-redux"

const Comments = () => {
  const user = useSelector((state) => state.user)
  const [comments, setComments] = useState([])
  const [numToShow, setNumToShow] = useState(5)
  const [message, setMessage] = useState(null)
  const [modalId, setModalId] = useState(null)
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState(null)
  const [timeoutId, setTimeoutId] = useState(null)

  useEffect(() => {
    commentService.getAll().then((data) => {
      setComments(data.sort(newestToOldest))
    })
  }, [])

  const loadMoreComments = () => {
    setNumToShow(numToShow + 5)
  }

  const handleClose = () => {
    setMessage(null)
    setModalId(null)
  }

  const handleDelete = (id, comment) => {
    setMessage(`Are you sure you want to delete "${comment}"?`)
    setModalId(id)
  }

  const deleteComment = (id) => {
    commentService.remove(id, user.token).then(() => {
      setComments(comments.filter(comment => comment.id !== id))
    })
    handleClose()
  }

  const readStory = (story) => {
    if (story) {
      navigate(`/story/${story.id}`)
    } else {
      setErrorMessage("Story has been deleted.")
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      setTimeoutId(setTimeout(() => {
        setErrorMessage(null)
        setTimeoutId(null)
      }, 5000))
    }
  }

  const notiOnClose = () => {
    setErrorMessage(null)
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    setTimeoutId(null)
  }

  return (
    <div className="mb-20 px-3 mx-auto max-w-screen-xl">
      {modalId && message && <ConfirmationModal message={message} handleClose={handleClose} handleSubmit={() => deleteComment(modalId)} />}
      {errorMessage && <Notification message={errorMessage} onClose={notiOnClose} type="error" />}
      <h3 className="mt-16 font-serif text-neutral-900 font-semibold text-4xl text-center px-2">Comments</h3>
      <div className="mt-10 font-serif flex items-center justify-center w-full overflow-x-auto border rounded">
        <table className="w-full text-sm text-left text-neutral-600 table-auto">
          <thead className="text-xs text-neutral-700 uppercase bg-neutral-100">
            <tr>
              <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">#</th>
              <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">Posted</th>
              <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">User</th>
              <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">Comment</th>
              <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">Story</th>
              <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">Likes</th>
              <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">Read</th>
              <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              comments.slice(0, numToShow).map((comment, index) => (
                <tr key={comment.id} className="hover:bg-neutral-100 border-t bg-neutral-50">
                  <td className="py-3 px-4 sm:py-4 sm:px-6">{index + 1}</td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6">{dateFormat(comment.createdAt)}</td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6">
                    {comment.authorId ? comment.authorId.username : 'dots-user'}
                  </td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6">
                    {comment.content}
                  </td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6">
                    {comment.storyId ? comment.storyId.title : 'dots-story'}
                  </td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6">
                    {comment.likes}
                  </td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6">
                    <button className="border border-neutral-600 rounded px-2 py-1 text-xs text-neutral-800 hover:bg-neutral-800 hover:text-neutral-50" onClick={() => readStory(comment.storyId)}>Read</button>
                  </td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6">
                    <button className="border border-neutral-600 rounded px-2 py-1 text-xs text-neutral-800 hover:bg-neutral-800 hover:text-neutral-50" onClick={() => handleDelete(comment.id, comment.content)}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      {
        numToShow < comments.length && (
          <div className="mt-6 flex justify-center">
            <button onClick={loadMoreComments} className="leading-8 font-extralight text-sm font-serif px-3 rounded bg-neutral-900 text-white hover:bg-neutral-600 transition duration-100 ease-in-out">
              Load more
            </button>
          </div>
        )
      }
    </div >
  )
}

export default Comments