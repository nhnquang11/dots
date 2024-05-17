const Header = () => {
  return (
    <nav>
      <div className="flex gap-5 justify-around my-3 px-5">
        {/* Logo */}
        <div>
          <a href="#" className="font-serif text-xl font-bold">Dots</a>
        </div>

        {/* Search bar */}
        <div className="max-w-lg grow flex justify-center align-center">
          <input
            type="search"
            className="w-full font-serif font-hairline text-sm rounded border border-gray-400 placeholder-gray-500 bg-transparent px-3 py-1 transition duration-200 ease-in-out focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
            placeholder="Search" />
        </div>

        {/* Profile */}
        <div className="flex justify-center align-center">
          <button type="button">
            <img className="h-8 w-8 rounded-full object-cover" src="https://huggingface.co/KappaNeuro/director-darren-aronofsky-style/resolve/main/2345259.jpeg" />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Header