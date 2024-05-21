import { useEffect, useState } from "react"

const Notification = ({ message, type }) => {
  const [open, setOpen] = useState(true)

  const close = () => {
    const notification = document.querySelector(".fixed")
    notification.style.display = "none"
  }

  let style;
  if (type == "succes") {
    style = "px-4 py-2 fixed top-10 left-1/2 transform -translate-x-1/2  w-10/12 max-w-[500px] border-[1.5px] border-green-700 font-serif bg-green-50 text-green-800 rounded-lg"
  } else if (type == "error") {
    style = "px-4 py-2 fixed top-10 left-1/2 transform -translate-x-1/2  w-10/12 max-w-[500px] border-[1.5px] border-red-700 font-serif bg-red-50 text-red-800 rounded-lg"
  } else {
    style = "px-4 py-2 fixed top-10 left-1/2 transform -translate-x-1/2  w-10/12 max-w-[500px] border-[1.5px] border-cyan-700 font-serif bg-cyan-50 text-cyan-800 rounded-lg"
  }

  if (!open || !message) {
    return null
  }

  return (
    <div>
      <div className={style}>
        <svg onClick={close} className="pointer-cursor w-4 h-4 absolute right-2 top-2" role="button" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
        <div className="my-4 flex justify-center text-center">
          {message}
        </div>
      </div>
    </div>
  )
}

export default Notification