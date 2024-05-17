import { useState } from "react";
import Overview from "../components/Overview"
import Profile from "../components/Profile"
import Comments from "../components/Comments"
import Users from "../components/Users"
import Stories from "../components/Stories"

const Dashboard = () => {
  const [componentToShow, setComponentToShow] = useState(<Overview />)

  const handleButtonOnClick = (e) => {
    const component = e.target.value
    if (component === 'overview') setComponentToShow(<Overview />);
    else if (component === 'profile') setComponentToShow(<Profile />);
    else if (component === 'comments') setComponentToShow(<Comments />);
    else if (component === 'users') setComponentToShow(<Users />);
    else if (component === 'stories') setComponentToShow(<Stories />);
  }

  return (
    <div>
      <div className="mt-16 flex justify-center">
        <div className="max-[450px]:max-w-[280px] flex justify-center flex-wrap gap-3 text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <button onClick={handleButtonOnClick} value="overview" className="leading-8 font-extralight text-sm font-serif px-3 rounded bg-neutral-900 text-white hover:bg-neutral-600 transition duration-200 ease-in-out">Overview</button>
          <button onClick={handleButtonOnClick} value="profile" className="leading-8 font-extralight text-sm font-serif px-3 rounded text-neutral-900 border border-neutral-900 hover:bg-neutral-200 transition duration-200 ease-in-out">Profile</button>
          <button onClick={handleButtonOnClick} value="comments" className="leading-8 font-extralight text-sm font-serif px-3 rounded text-neutral-900 border border-neutral-900 hover:bg-neutral-200 transition duration-200 ease-in-out">Comments</button>
          <button onClick={handleButtonOnClick} value="users" className="leading-8 font-extralight text-sm font-serif px-3 rounded text-neutral-900 border border-neutral-900 hover:bg-neutral-200 transition duration-200 ease-in-out">Users</button>
          <button onClick={handleButtonOnClick} value="stories" className="leading-8 font-extralight text-sm font-serif px-3 rounded text-neutral-900 border border-neutral-900 hover:bg-neutral-200 transition duration-200 ease-in-out">Stories</button>
        </div>
      </div>
      {componentToShow}
    </div>
  )
}

export default Dashboard