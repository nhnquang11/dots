import { useEffect } from "react";
import { useSearchParams } from "react-router-dom"
import storyService from "../services/storyService";
import StorySection from "../components/StorySection";
import { useState } from "react";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentQuery = searchParams.get('q');
    if (currentQuery) {
      console.log(123)
      setQuery(currentQuery)
      setLoading(true)
      storyService.getAll().then((stories) => {
        const filteredStories = stories.filter(story => story.title.toLowerCase().includes(currentQuery.toLowerCase()))
        setResults(filteredStories)
        console.log(filteredStories)
        setLoading(false)
      })
    }
  }, [searchParams])

  return (
    <div className="mb-16">
      <h3 className="mt-16 font-serif text-neutral-900 font-semibold text-4xl text-center px-2">Search results{query ? `: ${query}` : ''}</h3>
      {!loading && <StorySection initialStories={results} />}
    </div>
  )
}

export default Search