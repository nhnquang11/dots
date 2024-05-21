import { useSelector } from "react-redux"
import { useField } from "../hooks"
import commentService from "../services/commentService"
import storyService from "../services/storyService"
import { useState } from "react"
import { dateFormat } from "../utils"
import { useNavigate } from "react-router-dom"
import Notification from "./Notification"

const CommentSection = ({ storyId, comments, setStory }) => {
  const user = useSelector((state) => state.user)
  const [storyComments, setStoryComments] = useState([...comments])
  const [liked, setLiked] = useState(new Array(comments.length).fill(false))
  const [likes, setLikes] = useState(comments.map(comment => comment.likes))
  const comment = useField("text")
  const navigate = useNavigate()
  const [message, setMessage] = useState(null)
  const [timeoutId, setTimeoutId] = useState(null)

  const postComment = () => {
    commentService.post({ storyId, content: comment.value }, user.token).then(data => {
      setStoryComments([...storyComments, { ...data }])
      setLiked([...liked, false])
      setLikes([...likes, data.likes])
      comment.reset()
      storyService.addCommentToStory(storyId, { commentId: data.id }, user.token)
    })
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      postComment();
    }
  };

  const likeComment = (index) => {
    if (user) {
      const newLiked = [...liked]
      newLiked[index] = true
      setLiked(newLiked)
      const newLikes = [...likes]
      newLikes[index] = newLikes[index] + 1
      commentService.update(storyComments[index].id, { likes: newLikes[index] }, user.token)
      setLikes(newLikes)
    } else {
      setMessage("Sign in to like a comment.")
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      setTimeoutId(setTimeout(() => {
        setMessage(null)
        setTimeoutId(null)
      }, 5000))
    }
  }

  return (
    <div>
      {message && <Notification message={message} />}
      <div className="font-serif grid grid-cols-12 md:mx-24 px-5 gap-y-6">
        <h3 className=" bg-neutral-50 font-bold font-serif text-xl leading-8 text-neutral-800 col-span-full md:col-start-3 md:col-span-8">
          Comments
        </h3>
        <div className="col-span-full md:col-start-3 md:col-span-8">
          {
            storyComments.map((comment, index) => (
              <div key={comment.id} className="border border-neutral-400 rounded-md px-7 py-5 mb-4">
                <div>
                  <p className="font-bold text-lg text-neutral-800">{comment.authorId.name}</p>
                  <span className="text-neutral-400 text-sm font-extralight">Posted on {dateFormat(comment.createdAt)}</span>
                </div>
                <p className="mt-2 text-neutral-800">{comment.content}</p>
                <div onClick={() => likeComment(index)} className="cursor-pointer mt-2 flex items-center" value={index}>
                  {
                    liked[index] && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-red-500 w-5 h-5">
                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                      </svg>
                    )}
                  {
                    !liked[index] && (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-neutral-700 w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                      </svg>
                    )}
                  <span className="ml-1 text-sm text-neutral-700">{likes[index]} Likes</span>
                </div>
              </div>
            ))
          }

          {/* Join the discussion */}
          {
            user && (
              <div>
                <h3 className="mt-10 bg-neutral-50 font-bold font-serif text-xl leading-8 text-neutral-800 col-span-full md:col-start-3 md:col-span-8">
                  Join the discussion
                </h3>
                <div className="mt-6 flex gap-x-3">
                  <img className="w-10 h-10 rounded-full" src={user.profilePic} alt="" />
                  <div className="w-full">
                    <textarea onKeyPress={handleKeyPress} {...comment.getAttributes()} placeholder="Write a comment" rows="3" className="bg-neutral-50 placeholder-neutral-400 w-full border border-neutral-400 rounded-md px-4 py-3 sm:px-7 sm:py-5" />
                    <button onClick={postComment} className="mt-1 h-9 font-extralight text-sm font-serif px-5 rounded-md bg-neutral-900 text-white hover:bg-neutral-700 transition duration-200 ease-in-out">Post</button>
                  </div>
                </div>
              </div>
            )
          }
          {
            !user && (
              <div className="mt-8">
                <h3 className=" bg-neutral-50 font-bold font-serif text-xl leading-8 text-neutral-800 col-span-full md:col-start-3 md:col-span-8">
                  Sign in to join the discussion
                </h3>
                <div className="flex justify-center">
                  <img onClick={() => navigate('/sign-in')} className="mt-3 rounded w-40 cursor-pointer" src="https://c.tenor.com/yw2BELCxe44AAAAC/tenor.gif" alt="" />
                </div>
              </div>
            )
          }
        </div>
      </div>
      <div className="mb-16"></div>
    </div>
  )
}

export default CommentSection