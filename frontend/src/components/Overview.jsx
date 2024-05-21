import { useEffect, useState } from "react"
import storyService from "../services/storyService"
import trafficService from "../services/trafficService"
import commentService from "../services/commentService"
import { dateFormat } from "../utils"
import { newestToOldest } from "../utils"
import { useNavigate } from "react-router-dom"

const Overview = () => {
  const [stories, setStories] = useState([])
  const [traffic, setTraffic] = useState(null)
  const [comments, setComments] = useState([])
  const [numStoriesToShow, setNumStoriesToShow] = useState(4)
  const [numCommentsToShow, setNumCommentsToShow] = useState(5)
  const navigate = useNavigate()

  useEffect(() => {
    storyService.getAll().then((data) => {
      setStories(data.sort(newestToOldest))
    })
    trafficService.getTraffic().then((data) => {
      setTraffic(data.count)
    })
    commentService.getAll().then((data) => {
      setComments(data.sort(newestToOldest))
    })
  }, [])

  const loadMoreStories = () => {
    setNumStoriesToShow(numStoriesToShow + 4)
  }

  const viewStory = (id) => {
    navigate(`/story/${id}`)
  }

  const loadMoreComments = () => {
    setNumCommentsToShow(numCommentsToShow + 4)
  }

  return (
    <div className="mb-20 px-3 mx-auto max-w-screen-xl">
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
        <div className="px-6 py-6 border rounded shadow-sm hover:shadow-lg">
          <div className="font-serif text-sm text-neutral-500">Recent stories</div>
          <div className="mt-2 font-serif flex items-center justify-center w-full overflow-x-auto border rounded">
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
                    <tr key={story.id} className="border-t bg-neutral-50">
                      <td className="py-3 px-4 sm:py-4 sm:px-6">{index + 1}</td>
                      <td onClick={() => viewStory(story.id)} className="cursor-pointer py-3 px-4 sm:py-4 sm:px-6">
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
                <button onClick={loadMoreStories} className="leading-8 font-extralight text-sm font-serif px-3 rounded bg-neutral-900 text-white hover:bg-neutral-600 transition duration-100 ease-in-out">
                  Load more
                </button>
              </div>
            )
          }
        </div>
        <div className="px-6 py-6 border rounded shadow-sm hover:shadow-lg">
          <div className="font-serif text-sm text-neutral-500">Recent comments</div>
          <div className="mt-2 font-serif flex items-center justify-center w-full overflow-x-auto border rounded">
            <table className="w-full text-sm text-left text-neutral-500 table-auto">
              <thead className="text-xs text-neutral-700 uppercase bg-neutral-100">
                <tr>
                  <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">#</th>
                  <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">Comment</th>
                  <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">User</th>
                  <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">Posted</th>
                  <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">Likes</th>
                </tr>
              </thead>
              <tbody>
                {
                  numCommentsToShow < comments.length && comments.slice(0, numCommentsToShow).map((comment, index) => (
                    <tr key={comment.id} className="border-t bg-neutral-50">
                      <td className="py-3 px-4 sm:py-4 sm:px-6">{index + 1}</td>
                      <td className="py-3 px-4 sm:py-4 sm:px-6">{comment.content}</td>
                      <td className="py-3 px-4 sm:py-4 sm:px-6">{comment.authorId ? comment.authorId.username : null}</td>
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
                <button onClick={loadMoreComments} className="leading-8 font-extralight text-sm font-serif px-3 rounded bg-neutral-900 text-white hover:bg-neutral-600 transition duration-100 ease-in-out">
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