import { useState } from "react"

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleDropdownOnClick = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <nav>
      <div className="flex gap-5 justify-around my-3 px-5">
        {/* Logo */}
        <div>
          <a href="#" className="font-serif text-xl font-bold text-gray-950">Dots</a>
        </div>

        {/* Search bar */}
        <div className="max-w-lg grow flex justify-center align-center">
          <input
            type="search"
            className="w-full font-serif font-hairline text-sm rounded border border-gray-400 placeholder-gray-500 bg-transparent px-3 py-1 transition duration-200 ease-in-out focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
            placeholder="Search" />
        </div>

        {/* Profile dropdown */}
        <div className="relative">
          <div className="flex justify-center align-center">
            <button type="button" onClick={handleDropdownOnClick}>
              <img className="h-8 w-8 rounded-full object-cover" src="https://huggingface.co/KappaNeuro/director-darren-aronofsky-style/resolve/main/2345259.jpeg" />
            </button>
          </div>

          {
            isDropdownOpen &&
            <div className="flex flex-col absolute w-48 bg-gray-50 shadow-sm text-sm rounded border right-0 top-9 font-serif font-extralight text-gray-500">
              <div className="flex flex-col py-4 gap-4">
                <a href="" className="px-6 hover:text-gray-950">Profile</a>
                <a href="" className="px-6 hover:text-gray-950">Dashboard</a>
              </div>
              <hr className="" />
              <div className="flex flex-col py-4">
                <a href="" className="px-6 hover:text-gray-950">Sign Out</a>
              </div>
            </div>
          }
        </div>
      </div>
    </nav>
  )
}

export default Header