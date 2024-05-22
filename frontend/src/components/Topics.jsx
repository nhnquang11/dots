import { useEffect, useState } from 'react'
import ConfirmationModal from './ConfirmationModal'
import topicService from '../services/topicService'
import storyService from '../services/storyService'

const Topics = () => {
  const [numToShow, setNumToShow] = useState(5)
  const [topics, setTopics] = useState([])
  const [stories, setStories] = useState([])
  const [message, setMessage] = useState(null)
  const [modalId, setModalId] = useState(null)

  useEffect(() => {
    topicService.getAll().then((data) => {
      setTopics(data.sort((a, b) => a.name.localeCompare(b.name)))
    })

    storyService.getAll().then((data) => {
      setStories(data.sort())
    })

  }, [])

  const loadMoreTopics = () => {
    setNumToShow(numToShow + 5)
  }

  const handleClose = () => {
    setMessage(null)
    setModalId(null)
  }


  const countStories = (id) => {
    let count = 0
    stories.forEach(story => {
      for (let i = 0; i < story.topics.length; i++) {
        if (story.topics[i].id === id) {
          count++
          break
        }
      }
    })
    return count
  }

  const handleDeleteOnClick = (id, topicName) => {
    setMessage(`Are you sure you want to delete "${topicName}"?`)
    setModalId(id)
  }

  const deleteTopic = (id) => {
    topicService.remove(id).then(() => {
      setTopics(topics.filter(topic => topic.id !== id))
    })
    handleClose()
  }

  return (
    <div className="mb-20 px-3 mx-auto max-w-screen-xl">
      {modalId && message && <ConfirmationModal message={message} handleClose={handleClose} handleSubmit={() => deleteTopic(modalId)} />}
      <h3 className="mt-16 font-serif text-neutral-900 font-semibold text-4xl text-center px-2">Topics</h3>
      <div className="max-w-2xl mx-auto mt-10 font-serif flex items-center justify-center w-full overflow-x-auto border rounded">
        <table className="w-full text-sm text-left text-neutral-600 table-auto">
          <thead className="text-xs text-neutral-700 uppercase bg-neutral-100">
            <tr>
              <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">#</th>
              <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">Name</th>
              <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">Num Stories</th>
              <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">Edit</th>
              <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              topics.slice(0, numToShow).map((topic, index) => (
                <tr key={topic.id} className="hover:bg-neutral-100 border-t bg-neutral-50">
                  <td className="py-3 px-4 sm:py-4 sm:px-6">{index + 1}</td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6">{topic.name}</td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6">{countStories(topic.id)}</td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6">
                    <button className="border border-neutral-600 rounded px-2 py-1 text-xs text-neutral-800 hover:bg-neutral-800 hover:text-neutral-50" onClick={() => console.log("Edit")}>Edit</button>
                  </td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6">
                    <button className="border border-neutral-600 rounded px-2 py-1 text-xs text-neutral-800 hover:bg-neutral-800 hover:text-neutral-50" onClick={() => handleDeleteOnClick(topic.id, topic.name)}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      {
        numToShow < topics.length && (
          <div className="mt-6 flex justify-center">
            <button onClick={loadMoreTopics} className="leading-8 font-extralight text-sm font-serif px-3 rounded bg-neutral-900 text-white hover:bg-neutral-600 transition duration-100 ease-in-out">
              Load more
            </button>
          </div>
        )
      }
    </div>
  )
}

export default Topics