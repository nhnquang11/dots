import { dateFormat } from "../utils"
import { useNavigate } from "react-router-dom"
import { estimateReadingTime } from "../utils"


const StoryCard = ({ story }) => {
  const navigate = useNavigate()
  const readStory = (id) => {
    navigate(`/story/${id}`)
  }

  return (
    <div className="max-w-2xl">
      <div className="overflow-hidden rounded-lg w-full aspect-video">
        <img onClick={() => readStory(story.id)} className="object-cover w-full h-full hover:scale-105 transition duration-500 cursor-pointer" src={story.imageUrl} />
      </div>
      <article className="mt-3">
        <div className="flex items-center gap-x-4 text-xs">
          <time dateTime="2020-03-16" className="min-w-5 font-serif text-neutral-500">{dateFormat(story.createdAt)}</time>
          <div className="flex flex-wrap justify-center gap-1">
            {
              story.topics.map((topic) => (
                <a key={topic.id} className="cursor-pointer font-serif font-medium rounded-full bg-neutral-100 px-3 py-1.5 text-neutral-700 hover:bg-neutral-200">{topic.name}</a>
              ))
            }
          </div>
        </div>
        <div>
          <h3 className="font-serif mt-3 text-lg leading-6 font-semibold text-neutral-900 group-hover:text-neutral-600">
            <a className="cursor-pointer" onClick={() => readStory(story.id)}>
              {story.title}
            </a>
          </h3>
          <p className="font-serif mt-4 line-clamp-3 text-sm leading-6 text-neutral-600">{story.description}</p>
          <p className="font-serif mt-4 text-xs text-neutral-500">{estimateReadingTime(story.content)} min reading</p>
        </div>
      </article>
    </div>
  )
}

export default StoryCard