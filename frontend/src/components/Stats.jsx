import { useEffect, useState } from "react"
import storyService from "../services/storyService"
import trafficService from "../services/trafficService"

const Stats = () => {
  const [stories, setStories] = useState([])
  const [traffic, setTraffic] = useState(null)
  useEffect(() => {
    storyService.getAll().then((data) => {
      setStories(data)
    })
    trafficService.getTraffic().then((data) => {
      setTraffic(data.count)
    })
  }, [])

  return (
    <div className="mb-20 mx-3 sm:mx-10">
      <h3 className="mt-16 font-serif font-semibold text-4xl text-center px-2">Currently there are...</h3>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 rounded-lg gap-3">
        <div className="px-6 py-6 border rounded shadow-sm hover:shadow-lg cursor-pointer">
          <dt className="font-serif text-sm text-neutral-500">Visitors</dt>
          <dd className="font-serif text-3xl mt-1">{traffic}</dd>
        </div>
        <div className="px-6 py-6 border rounded shadow-sm hover:shadow-lg cursor-pointer">
          <dt className="font-serif text-sm text-neutral-500">Comments</dt>
          <dd className="font-serif text-3xl mt-1">224</dd>
        </div>
        <div className="px-6 py-6 border rounded shadow-sm hover:shadow-lg cursor-pointer">
          <dt className="font-serif text-sm text-neutral-500">Stories</dt>
          <dd className="font-serif text-3xl mt-1">{stories.length}</dd>
        </div>
        <div className="px-6 py-6 border rounded shadow-sm hover:shadow-lg cursor-pointer">
          <dt className="font-serif text-sm text-neutral-500">Reactions</dt>
          <dd className="font-serif text-3xl mt-1">88</dd>
        </div>
      </div>
    </div>
  )
}

export default Stats