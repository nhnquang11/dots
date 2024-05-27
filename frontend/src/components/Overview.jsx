import { useEffect, useState } from "react"
import storyService from "../services/storyService"
import trafficService from "../services/trafficService"
import commentService from "../services/commentService"
import { dateFormat } from "../utils"
import { newestToOldest } from "../utils"
import { useNavigate } from "react-router-dom"
import Notification from "./Notification"
import { useSelector } from "react-redux"

const Overview = () => {
  const user = useSelector((state) => state.user)
  const [stories, setStories] = useState([])
  const [traffic, setTraffic] = useState(null)
  const [comments, setComments] = useState([])
  const [numStoriesToShow, setNumStoriesToShow] = useState(5)
  const [numCommentsToShow, setNumCommentsToShow] = useState(5)
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState(null)
  const [timeoutId, setTimeoutId] = useState(null)

  useEffect(() => {
    storyService.getAll().then((data) => {
      setStories(data.sort(newestToOldest))
    })
    trafficService.getTraffic(user.token).then((data) => {
      setTraffic(data.count)
    })
    commentService.getAll().then((data) => {
      setComments(data.sort(newestToOldest))
    })
  }, [])

  const loadMoreStories = () => {
    setNumStoriesToShow(numStoriesToShow + 5)
  }

  const viewStory = (id) => {
    navigate(`/story/${id}`)
  }

  const viewComment = (story, commentId) => {
    if (story) {
      navigate(`/story/${story.id}#${commentId}`)
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

  const loadMoreComments = () => {
    setNumCommentsToShow(numCommentsToShow + 5)
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
      {errorMessage && <Notification message={errorMessage} onClose={notiOnClose} type="error" />}
      <h3 className="mt-16 font-serif text-neutral-900 font-semibold text-4xl text-center px-2">Currently there are...</h3>

      {/* Numbers */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 rounded-lg gap-x-2 gap-y-3">
        <div className="px-6 py-6 border rounded shadow-sm hover:shadow-lg">
          <dt className="font-serif text-sm text-neutral-500">Visitors</dt>
          <dd className="font-serif text-neutral-900 text-3xl mt-1">{traffic}</dd>
        </div>
        <div className="px-6 py-6 border rounded shadow-sm hover:shadow-lg">
          <dt className="font-serif text-sm text-neutral-500">Stories</dt>
          <dd className="font-serif text-neutral-900 text-3xl mt-1">{stories.length}</dd>
        </div>
        <div className="px-6 py-6 border rounded shadow-sm hover:shadow-lg">
          <dt className="font-serif text-sm text-neutral-500">Claps</dt>
          <dd className="font-serif text-neutral-900 text-3xl mt-1">{stories.reduce((claps, story) => claps + story.likes, 0)}</dd>
        </div>
        <div className="px-6 py-6 border rounded shadow-sm hover:shadow-lg">
          <dt className="font-serif text-sm text-neutral-500">Comments</dt>
          <dd className="font-serif text-neutral-900 text-3xl mt-1">{comments.length}</dd>
        </div>
      </div>

      {/* Stories and comments */}
      <div className="mt-3 grid grid-cols-1 lg:grid-cols-2 rounded-lg gap-x-2 gap-y-3">
        {/* Recent stories */}
        <div className="px-6 py-6 border rounded shadow-sm hover:shadow-lg">
          <div className="font-serif text-sm text-neutral-500">Recent stories</div>
          <div className="mt-3 font-serif flex items-center justify-center w-full overflow-x-auto border rounded">
            <table className="w-full text-sm text-left text-neutral-500 table-auto">
              <thead className="text-xs text-neutral-700 uppercase bg-neutral-100">
                <tr>
                  <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">#</th>
                  <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">Preview</th>
                  <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">Title</th>
                  <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">Posted</th>
                  <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">Claps</th>
                </tr>
              </thead>
              <tbody>
                {
                  stories && stories.slice(0, numStoriesToShow).map((story, index) => (
                    <tr onClick={() => viewStory(story.id)} key={story.id} className="cursor-pointer hover:text-neutral-800 border-t bg-neutral-50">
                      <td className="py-3 px-4 sm:py-4 sm:px-6">{index + 1}</td>
                      <td className="py-3 px-4 sm:py-4 sm:px-6">
                        <img className="max-h-16 h-full rounded aspect-video object-cover" src={story.imageUrl} alt="" />
                      </td>
                      <td className="py-3 px-4 sm:py-4 sm:px-6">{story.title}</td>
                      <td className="py-3 px-4 sm:py-4 sm:px-6">{dateFormat(story.createdAt)}</td>
                      <td className="py-3 px-4 sm:py-4 sm:px-6">{story.likes}</td>
                    </tr>)
                  )
                }
              </tbody>
            </table>
          </div>
          {
            numStoriesToShow < stories.length && (
              <div className="mt-3 flex justify-center">
                <button onClick={loadMoreStories} className="leading-8 font-extralight text-sm font-serif px-3 rounded bg-neutral-900 text-white hover:bg-neutral-700 transition duration-100 ease-in-out">
                  Load more
                </button>
              </div>
            )
          }
        </div>

        {/* Recent comments */}
        <div className="px-6 py-6 border rounded shadow-sm hover:shadow-lg">
          <div className="font-serif text-sm text-neutral-500">Recent comments</div>
          <div className="mt-3 font-serif flex items-center justify-center w-full overflow-x-auto border rounded">
            <table className="w-full text-sm text-left text-neutral-500 table-auto">
              <thead className="text-xs text-neutral-700 uppercase bg-neutral-100">
                <tr>
                  <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">#</th>
                  <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">Comment</th>
                  <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">Story</th>
                  <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">Posted</th>
                  <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">Likes</th>
                </tr>
              </thead>
              <tbody>
                {
                  numCommentsToShow < comments.length && comments.slice(0, numCommentsToShow).map((comment, index) => (
                    <tr onClick={() => viewComment(comment.storyId, comment.id)} key={comment.id} className="cursor-pointer hover:text-neutral-800 border-t bg-neutral-50">
                      <td className="py-3 px-4 sm:py-4 sm:px-6">{index + 1}</td>
                      <td className="py-3 px-4 sm:py-4 sm:px-6">{comment.content}</td>
                      <td className="py-3 px-4 sm:py-4 sm:px-6">{comment.storyId ? comment.storyId.title : "dots-story"}</td>
                      <td className="py-3 px-4 sm:py-4 sm:px-6">{dateFormat(comment.createdAt)}</td>
                      <td className="py-3 px-4 sm:py-4 sm:px-6">{comment.likes}</td>
                    </tr>)
                  )
                }
              </tbody>
            </table>
          </div>
          {
            numCommentsToShow < comments.length && (
              <div className="mt-3 flex justify-center">
                <button onClick={loadMoreComments} className="leading-8 font-extralight text-sm font-serif px-3 rounded bg-neutral-900 text-white hover:bg-neutral-700 transition duration-100 ease-in-out">
                  Load more
                </button>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Overview