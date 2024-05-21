
const ConfirmationModal = ({ message, handleClose, handleSubmit }) => {
  return (
    <div className="font-serif top-0 left-0 z-50 fixed w-screen h-screen bg-black bg-opacity-30 flex justify-center items-center px-3">
      <div className="h-fit shadow-xl rounded-md bg-neutral-50 p-2 max-w-screen-sm sm:min-w-[500px]">
        <div className="flex justify-end">
          <button onClick={() => handleClose()} className="hover:bg-neutral-200 rounded p-1">
            <svg role="button" className="w-5 h-5 fill-neutral-700" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
        <div className="p-3 pt-0">
          <div className="flex justify-center flex-col items-center p-5 pt-1">
            <p className="text-2xl font-bold text-neutral-800">Hang on a sec!</p>
            <p className="mt-3 text-center text-neutral-600">{message}</p>
          </div>

          <div className="grid-cols-2 grid gap-2">
            <button onClick={() => handleClose()} className="h-11 font-extralight text-sm font-serif px-5 rounded bg-neutral-50 text-neutral-600 border-neutral-600 border hover:bg-neutral-200 transition duration-200 ease-in-out">
              Cancel
            </button>
            <button onClick={() => handleSubmit()} className="h-11 font-extralight text-sm font-serif px-5 rounded bg-neutral-800 text-neutral-50 hover:bg-neutral-700 transition duration-200 ease-in-out">
              Yes
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ConfirmationModal