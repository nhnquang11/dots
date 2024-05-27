import { useSelector } from "react-redux"
import { useField } from "../hooks"
import commentService from "../services/commentService"
import storyService from "../services/storyService"
import { useState, useEffect } from "react"
import { dateFormat } from "../utils"
import { useNavigate } from "react-router-dom"
import Notification from "./Notification"
import CommentEditor from "./CommentEditor"
import ConfirmationModal from './ConfirmationModal'
import { useCallback } from 'react';
import useWebSocket from 'react-use-websocket';

const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
const hostname = window.location.hostname;
const port = window.location.port ? `:${window.location.port === "5173" ? 3001 : window.location.port}` : '';

const CommentSection = ({ storyId, comments }) => {
  const user = useSelector((state) => state.user)
  const [storyComments, setStoryComments] = useState([...comments])
  const [liked, setLiked] = useState(new Array(comments.length).fill(false))
  const [likes, setLikes] = useState(comments.map(comment => comment.likes))
  const comment = useField("text")
  const navigate = useNavigate()
  const [message, setMessage] = useState(null)
  const [timeoutId, setTimeoutId] = useState(null)
  const [editList, setEditList] = useState([])
  const [modalId, setModalId] = useState(null)
  const [modalIndex, setModalIndex] = useState(null)
  const [modalMessage, setModalMessage] = useState(null)
  const [socketUrl, setSocketUrl] = useState(`${protocol}${hostname}${port}`);
  const { sendMessage, lastMessage } = useWebSocket(socketUrl, {
    share: true,
  });

  const broadcastStoryUpdate = useCallback(() => {
    sendMessage(JSON.stringify({ storyId }));
  }, [sendMessage, storyId]);

  useEffect(() => {
    if (lastMessage) {
      const storyId = JSON.parse(lastMessage.data.toString()).storyId
      storyService.getOne(storyId).then((story) => {
        setStoryComments(story.comments)
        setLiked(new Array(story.comments.length).fill(false))
        setLikes(story.comments.map(comment => comment.likes))
      })
    }
  }, [lastMessage])


  const postComment = () => {
    commentService.post({ storyId, content: comment.value }, user.token).then(data => {
      setStoryComments([...storyComments, data])
      setLiked([...liked, false])
      setLikes([...likes, 0])
      comment.reset()
      storyService.addCommentToStory(storyId, { commentId: data.id }, user.token).then((story) => {
        broadcastStoryUpdate()
      })
    })
  }

  const saveComment = (id, content) => {
    commentService.update(id, { content: content }, user.token).then(() => {
      setStoryComments(storyComments.map(comment => comment.id === id ? { ...comment, content } : comment))
      setEditList(editList.filter(commentId => commentId !== id))
      broadcastStoryUpdate()
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

  const notiOnClose = () => {
    setMessage(null)
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    setTimeoutId(null)
  }

  const handleDeleteOnClick = (index, id, content) => {
    setModalId(id)
    setModalIndex(index)
    setModalMessage(`Are you sure you want to delete "${content}"?`)
  }

  const deleteComment = (id, index) => {
    setStoryComments(storyComments.filter(comment => comment.id !== id))
    setLiked(liked.filter((like, i) => i !== index))
    setLikes(likes.filter((like, i) => i !== index))
    commentService.remove(id, user.token).then(() => {
      broadcastStoryUpdate()
    })
    setModalId(null)
    setModalIndex(null)
    setModalMessage(null)
    setMessage("Comment deleted.")
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    setTimeoutId(setTimeout(() => {
      setMessage(null)
      setTimeoutId(null)
    }, 5000))
  }

  const handleModalOnClose = () => {
    setModalId(null)
    setModalIndex(null)
    setModalMessage(null)
  }

  return (
    <div>
      {message && <Notification onClose={notiOnClose} message={message} />}
      {modalId && modalIndex && modalMessage && <ConfirmationModal message={modalMessage} handleClose={handleModalOnClose} handleSubmit={() => deleteComment(modalId, modalIndex)} />}
      <div className="font-serif grid grid-cols-12 md:mx-24 px-5 gap-y-6">
        <h3 className=" bg-neutral-50 font-bold font-serif text-xl leading-8 text-neutral-800 col-span-full md:col-start-3 md:col-span-8">
          Comments
        </h3>
        <div className="col-span-full md:col-start-3 md:col-span-8">
          {
            storyComments.map((comment, index) => (
              <div key={comment.id} className="border border-neutral-400 rounded-md px-7 py-5 mb-4">
                <div>
                  <p className="font-bold text-lg text-neutral-800">{comment.authorId ? comment.authorId.name : "Dots User"}</p>
                  <span className="text-neutral-400 text-sm font-extralight">Posted on {dateFormat(comment.createdAt)}</span>
                </div>
                <p className="mt-2 text-neutral-800">{comment.content}</p>
                <div className="mt-2 flex justify-between items-center">
                  <div onClick={() => likeComment(index)} className="cursor-pointer flex items-center" value={index}>
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
                  {
                    comment.authorId && user && user.id === comment.authorId.id && (
                      <div>
                        <button onClick={() => setEditList([...editList, comment.id])} value="comments" className="leading-8 font-extralight text-sm font-serif px-1 rounded text-neutral-500 hover:text-neutral-600 transition duration-100 ease-in-out">Edit</button>
                        <span className="text-neutral-500">|</span>
                        <button onClick={() => handleDeleteOnClick(index, comment.id, comment.content)} value="comments" className="leading-8 font-extralight text-sm font-serif px-1 rounded text-neutral-500 hover:text-neutral-600 transition duration-100 ease-in-out">Delete</button>
                      </div>
                    )
                  }
                  {
                    user && user.isAdmin && !(comment.authorId && user.id === comment.authorId.id) && (
                      <div>
                        <button onClick={() => handleDeleteOnClick(index, comment.id, comment.content)} value="comments" className="leading-8 font-extralight text-sm font-serif px-1 rounded text-neutral-500 hover:text-neutral-600 transition duration-100 ease-in-out">Delete</button>
                      </div>
                    )
                  }
                </div>
                {
                  editList.includes(comment.id) && (
                    <CommentEditor onSave={(content) => saveComment(comment.id, content)} onCancel={() => setEditList(editList.filter(id => id !== comment.id))} defaultValue={comment.content} />
                  )
                }
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
                  <img className="w-10 h-10 rounded object-cover" src={user.profilePic} alt="" />
                  <div className="w-full">
                    <textarea onKeyPress={handleKeyPress} {...comment.getAttributes()} placeholder="Write a comment" rows="3" className="bg-neutral-50 placeholder-neutral-400 w-full border border-neutral-400 rounded-md px-4 py-3 sm:px-7 sm:py-5" />
                    <button onClick={postComment} className="mt-1 h-9 font-extralight text-sm font-serif px-5 rounded-md bg-neutral-800 text-neutral-50 hover:bg-neutral-700 transition duration-200 ease-in-out">Post</button>
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