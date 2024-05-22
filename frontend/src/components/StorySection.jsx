import { useEffect, useState } from "react"
import StoryCard from "./StoryCard"
import storyService from "../services/storyService"
import topicService from "../services/topicService"
import { newestToOldest, oldestToNewest, aToZ, zToA, likesLeastToMost, likesMostToLeast, viewsLeastToMost, viewsMostToLeast } from "../utils"

const StorySection = ({ initialStories }) => {
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false)
  const [stories, setStories] = useState([])
  const [storiesToShow, setStoriesToShow] = useState([])
  const [topics, setTopics] = useState([])
  const [radioValue, setRadioValue] = useState('new')
  const [checkedTopics, setCheckedTopics] = useState([])
  const [numToShow, setNumToShow] = useState(6)

  useEffect(() => {
    if (initialStories) {
      setStories(initialStories)
      setStoriesToShow(initialStories.sort(newestToOldest))
    } else {
      storyService.getAll().then((data) => {
        setStories(data)
        setStoriesToShow(data.sort(newestToOldest))
      })
    }

    topicService.getAll().then((data) => {
      setTopics(data.sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      }))
    })
  }, [])

  const handleSortOnClick = () => {
    if (isFilterDropdownOpen) setIsFilterDropdownOpen(false);
    setIsSortDropdownOpen(!isSortDropdownOpen)
  }

  const handleCancelSort = () => {
    setIsSortDropdownOpen(false)
  }

  const handleFilterOnClick = () => {
    if (isSortDropdownOpen) setIsSortDropdownOpen(false);
    setIsFilterDropdownOpen(!isFilterDropdownOpen)
  }

  const handleCancelFilter = () => {
    setIsFilterDropdownOpen(false)
  }

  const handleOptionChange = (event) => {
    setRadioValue(event.target.value);
  }

  const sortStories = (storiesList) => {
    if (radioValue === 'new') {
      return storiesList.sort(newestToOldest)
    } else if (radioValue === 'old') {
      return storiesList.sort(oldestToNewest)
    } else if (radioValue === 'abc') {
      return storiesList.sort(aToZ)
    } else if (radioValue === 'cba') {
      return storiesList.sort(zToA)
    } else if (radioValue === 'view-high-low') {
      return storiesList.sort(viewsMostToLeast)
    } else if (radioValue === 'view-low-hight') {
      return storiesList.sort(viewsLeastToMost)
    } else if (radioValue === 'clap-high-low') {
      return storiesList.sort(likesMostToLeast)
    } else if (radioValue === 'clap-low-high') {
      return storiesList.sort(likesLeastToMost)
    }
  }

  const applySort = () => {
    setIsSortDropdownOpen(false)
    setStoriesToShow(sortStories(storiesToShow))
  }

  const showMore = () => {
    if (numToShow + 6 > storiesToShow.length) setNumToShow(storiesToShow.length)
    else setNumToShow(numToShow + 6)
  }

  const checkTopic = (event) => {
    if (event.target.checked) {
      setCheckedTopics([...checkedTopics, event.target.value])
    } else {
      setCheckedTopics(checkedTopics.filter((topic) => topic !== event.target.value))
    }
  }

  const filterStories = () => {
    setIsFilterDropdownOpen(false)
    const filteredStories = stories.filter((story) => {
      const hasAllTopics = checkedTopics.every(id => {
        for (let i = 0; i < story.topics.length; i++) {
          if (id === story.topics[i].id) return true
        }
        return false
      })
      return hasAllTopics
    })
    setStoriesToShow(sortStories(filteredStories))
  }

  return (
    <div className="flex flex-col items-center mt-16 lg:mt-20">
      <div className="flex justify-between items-center gap-x-2">
        <div className="pl-3 pr-6 font-serif text-neutral-900">{storiesToShow.length} stories</div>

        {/* Filter */}
        <div className="relative ">
          <button onClick={handleFilterOnClick} className="flex items-center leading-10 font-serif text-neutral-900 px-6 rounded-full transition duration-200 ease-in-out hover:bg-neutral-200 focus:bg-white border border-transparent focus:border-neutral-500">
            Filter
            <svg className="ml-1" xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 16 16" fill="none"><path fill="currentColor" fillRule="evenodd" d="M9.667 3.333a1.333 1.333 0 1 0 0 2.667 1.333 1.333 0 0 0 0-2.667ZM7.084 4a2.668 2.668 0 0 1 5.165 0h1.084a.667.667 0 1 1 0 1.333H12.25a2.668 2.668 0 0 1-5.165 0H2.667a.667.667 0 1 1 0-1.333h4.417Zm-.75 6a1.333 1.333 0 1 0 0 2.667 1.333 1.333 0 0 0 0-2.667Zm-2.583.667a2.668 2.668 0 0 1 5.165 0h4.417a.667.667 0 1 1 0 1.333H8.916a2.668 2.668 0 0 1-5.165 0H2.667a.667.667 0 0 1 0-1.333H3.75Z" clipRule="evenodd"></path></svg>
          </button>
          {
            isFilterDropdownOpen &&
            <div className="absolute top-14 right-1 shadow z-10 w-56 pt-3 bg-white rounded">
              <fieldset>
                <legend className="mx-4 font-serif pt-2 pb-3 text-neutral-500">Topic</legend>
                <hr />
                <div className="pl-4 overflow-auto max-h-56">
                  {
                    topics.map((topic) => (
                      <div key={topic.id} className="py-3 flex items-center">
                        <input checked={checkedTopics.some(id => id === topic.id)} onChange={checkTopic} value={topic.id} className="cursor-pointer accent-neutral-950 hover:accent-neutral-500" id={`topic-${topic.name}`} type="checkbox" />
                        <label className="pl-3 font-serif cursor-pointer" htmlFor={`topic-${topic.name}`}>{topic.name}</label>
                      </div>
                    ))
                  }
                </div>
                <hr />
                <div className="flex px-6 py-2 gap-14 justify-center">
                  <button type="button" onClick={handleCancelFilter} className="hover:text-neutral-500 text-neutral-600 font-extralight py-2 font-serif">Cancel</button>
                  <button type="button" onClick={filterStories} className="hover:text-neutral-500 text-neutral-800 font-extralightpy-2 font-serif">Apply</button>
                </div>
              </fieldset>
            </div>
          }
        </div>


        {/* Sort */}
        <div className="relative">
          <button onClick={handleSortOnClick} className="flex items-center leading-10 font-serif text-neutral-900 px-6 rounded-full transition duration-200 ease-in-out hover:bg-neutral-200 focus:bg-white border border-transparent focus:border-neutral-500">
            Sort
            <svg className="ml-1" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 10 6" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L5 3.58579L8.29289 0.292894C8.68342 -0.0976307 9.31658 -0.0976307 9.70711 0.292894C10.0976 0.683418 10.0976 1.31658 9.70711 1.70711L5.70711 5.70711C5.31658 6.09763 4.68342 6.09763 4.29289 5.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z" fill="currentColor"></path></svg>
          </button>
          {
            isSortDropdownOpen &&
            <div className="absolute top-14 right-1 shadow z-10 w-56 pt-4 bg-white rounded">
              <fieldset>
                <div className="px-4">
                  <div className="py-2 flex items-center">
                    <input onChange={handleOptionChange} checked={radioValue === "new"} id="new" type="radio" value="new" name="sort" className="cursor-pointer accent-neutral-950 hover:accent-neutral-500" />
                    <label className="pl-3 font-serif cursor-pointer" htmlFor="new">Newest → Oldest</label>
                  </div>
                  <div className="py-2 flex items-center">
                    <input onChange={handleOptionChange} checked={radioValue === "old"} id="old" type="radio" value="old" name="sort" className="cursor-pointer accent-neutral-950 hover:accent-neutral-500" />
                    <label className="pl-3 font-serif cursor-pointer" htmlFor="old">Oldest → Newest</label>
                  </div>
                  <div className="py-2 flex items-center">
                    <input onChange={handleOptionChange} checked={radioValue === "abc"} id="abc" type="radio" value="abc" name="sort" className="cursor-pointer accent-neutral-950 hover:accent-neutral-500" />
                    <label className="pl-3 font-serif cursor-pointer" htmlFor="abc">Alphabetical (A-Z)</label>
                  </div>
                  <div className="py-2 flex items-center">
                    <input onChange={handleOptionChange} checked={radioValue === "cba"} id="cba" type="radio" value="cba" name="sort" className="cursor-pointer accent-neutral-950 hover:accent-neutral-500" />
                    <label className="pl-3 font-serif cursor-pointer" htmlFor="cba">Alphabetical (Z-A)</label>
                  </div>
                  <div className="py-2 flex items-center">
                    <input onChange={handleOptionChange} checked={radioValue === "view-high-low"} id="view-high-low" type="radio" value="view-high-low" name="sort" className="cursor-pointer accent-neutral-950 hover:accent-neutral-500" />
                    <label className="pl-3 font-serif cursor-pointer" htmlFor="view-high-low">Views (high -&gt; low)</label>
                  </div>
                  <div className="py-2 flex items-center">
                    <input onChange={handleOptionChange} checked={radioValue === "view-low-hight"} id="view-low-hight" type="radio" value="view-low-hight" name="sort" className="cursor-pointer accent-neutral-950 hover:accent-neutral-500" />
                    <label className="pl-3 font-serif cursor-pointer" htmlFor="view-low-hight">Views (low -&gt; high)</label>
                  </div>
                  <div className="py-2 flex items-center">
                    <input onChange={handleOptionChange} checked={radioValue === "clap-high-low"} id="clap-high-low" type="radio" value="clap-high-low" name="sort" className="cursor-pointer accent-neutral-950 hover:accent-neutral-500" />
                    <label className="pl-3 font-serif cursor-pointer" htmlFor="clap-high-low">Claps (high -&gt; low)</label>
                  </div>
                  <div className="py-2 flex items-center">
                    <input onChange={handleOptionChange} checked={radioValue === "clap-low-high"} id="clap-low-high" type="radio" value="clap-low-high" name="sort" className="cursor-pointer accent-neutral-950 hover:accent-neutral-500" />
                    <label className="pl-3 font-serif cursor-pointer" htmlFor="clap-low-high">Claps (low -&gt; high)</label>
                  </div>
                </div>
                <hr className="mt-2" />
                <div className="flex px-6 py-2 gap-14 justify-center">
                  <button type="button" onClick={handleCancelSort} className="hover:text-neutral-500 text-neutral-600 font-extralight py-2 font-serif">Cancel</button>
                  <button type="button" onClick={applySort} className="hover:text-neutral-500 text-neutral-800 font-extralightpy-2 font-serif">Apply</button>
                </div>
              </fieldset>
            </div>
          }
        </div>


      </div >
      <div className="mt-8 mb-14 px-6 md:px-8 flex flex-col items-start align-top lg:grid lg:grid-cols-3 gap-x-8 gap-y-12">
        {
          storiesToShow.slice(0, numToShow).map((story) => (
            <StoryCard key={story.id} story={story} />
          ))
        }
      </div>
      {
        numToShow < storiesToShow.length &&
        <button onClick={showMore} className="mb-14 h-11 font-extralight text-sm font-serif px-5 rounded bg-neutral-900 text-white hover:bg-neutral-600 transition duration-200 ease-in-out">
          Load more
        </button>
      }
    </div >
  )
}

export default StorySection