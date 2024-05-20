import { useState } from "react"
import logo from "../assets/dots.png"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { signOut } from "../reducers/userReducer"
import { useNavigate } from "react-router-dom"

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDropdownOnClick = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleSignOut = () => {
    dispatch(signOut())
    setIsDropdownOpen(false)
    navigate('/')
  }

  return (
    <nav>
      <div className="flex gap-5 justify-around my-4 px-5 max-w-[2160px] mx-auto">
        {/* Logo */}
        <div>
          <Link to="/" className="flex items-center gap-1 font-serif text-xl font-bold text-neutral-950"><img src={logo} className="inline w-7 h-7" /></Link>
        </div>

        {/* Search bar */}
        <div className="max-w-lg grow flex justify-center items-center">
          <input
            type="search"
            className="w-full font-serif font-hairline text-sm rounded border border-neutral-400 placeholder-neutral-500 bg-transparent px-3 py-1 transition duration-200 ease-in-out focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
            placeholder="Search" />
        </div>

        {
          !user &&
          <Link to='sign-in' className="flex justify-center items-center h-8 text-xs font-semibold font-serif px-5 rounded bg-neutral-50 border-[1.2px] border-neutral-900 text-neutral-900 shadow-sm hover:bg-neutral-900 hover:text-neutral-50 transition duration-200 ease-in-out">
            Log in
          </Link>
        }

        {/* Profile dropdown */}
        {
          user &&
          <div className="relative">
            <div className="flex justify-center align-center">
              <button type="button" onClick={handleDropdownOnClick}>
                <img className="h-8 w-8 rounded-full object-cover" src={user.profilePic} />
              </button>
            </div>

            {
              isDropdownOpen &&
              <div className="flex flex-col absolute w-48 bg-neutral-50 shadow-sm text-sm rounded border right-0 top-9 font-serif font-extralight text-neutral-500">
                <div className="py-3 pl-6 flex justify-start items-center text-neutral-600 font-semibold">{user.name}</div>
                <hr />
                <div className="flex flex-col py-4 gap-4">
                  <Link onClick={() => setIsDropdownOpen(false)} to="/profile" className="px-6 hover:text-neutral-950">Profile</Link>
                  <Link onClick={() => setIsDropdownOpen(false)} to="/dashboard" className="px-6 hover:text-neutral-950">Dashboard</Link>
                  <Link onClick={() => setIsDropdownOpen(false)} to="/new-story" className="px-6 hover:text-neutral-950">Write</Link>
                </div>
                <hr />
                <div className="flex flex-col py-4 items-start">
                  <button onClick={handleSignOut} to="/" className="px-6 hover:text-neutral-950">Sign out</button>
                </div>
              </div>
            }
          </div>
        }
      </div>
      <hr />
    </nav>
  )
}

export default Header