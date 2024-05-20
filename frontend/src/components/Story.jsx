import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import storyService from "../services/storyService";
import StoryContent from "./StoryContent";
import { dateFormat } from "../utils";
import CommentSection from "./CommentSection";

const Story = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null)

  useEffect(() => {
    console.log(id)
    storyService.getOne(id).then((data) => {
      setStory(data)
    })
  }, [])

  if (!story) { return null }
  return (
    <div>
      <div className="flex flex-col items-center text-center px-5 mt-16 md:mt-28">
        <p className="font-serif text-neutral-600 mb-3">{dateFormat(story.createdAt)}</p>
        <h className="font-serif text-neutral-800 text-5xl md:text-6xl leading-[50px] md:leading-[70px] max-w-4xl">{story.title}</h>
        <p className="font-serif text-neutral-800 text-xl md:text-2xl leading-7 md:leading-9 max-w-xl mt-6">{story.description}</p>
        <div className="mt-6 flex flex-wrap gap-2 justify-center items-center">
          {
            story.topics.map((topic) => {
              return <div key={topic.id} className="cursor-pointer text-sm font-serif font-medium rounded-full border border-neutral-600 px-3 py-1.5 text-neutral-700 hover:bg-neutral-100">{topic.name}</div>
            })
          }
        </div>
      </div>
      <div className="px-5 my-16 md:my-20 flex justify-center">
        <img className="max-h-[612px] rounded w-full max-w-5xl object-cover" src={story.imageUrl} />
      </div>
      <StoryContent htmlContent={story.content} />
      <div className="mb-16"></div>
      <CommentSection storyId={id} />
    </div>
  )
}

export default Story