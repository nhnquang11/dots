import Stats from "../components/Stats"

const Dashboard = () => {
  return (
    <div>
      <div className="mt-16 flex justify-center">
        <div className="max-[450px]:max-w-[280px] flex justify-center flex-wrap gap-3 text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <button className="leading-8 font-extralight text-sm font-serif px-3 rounded bg-neutral-900 text-white hover:bg-neutral-600 transition duration-200 ease-in-out">Overview</button>
          <button className="leading-8 font-extralight text-sm font-serif px-3 rounded text-neutral-900 border border-neutral-900 hover:bg-neutral-200 transition duration-200 ease-in-out">Profile</button>
          <button className="leading-8 font-extralight text-sm font-serif px-3 rounded text-neutral-900 border border-neutral-900 hover:bg-neutral-200 transition duration-200 ease-in-out">Comments</button>
          <button className="leading-8 font-extralight text-sm font-serif px-3 rounded text-neutral-900 border border-neutral-900 hover:bg-neutral-200 transition duration-200 ease-in-out">Users</button>
          <button className="leading-8 font-extralight text-sm font-serif px-3 rounded text-neutral-900 border border-neutral-900 hover:bg-neutral-200 transition duration-200 ease-in-out">Posts</button>
        </div>
      </div>
      <Stats />
    </div>
  )
}

export default Dashboard