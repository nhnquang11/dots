const CommentSection = () => {
  return (
    <div>
      <div className="font-serif grid grid-cols-12 md:mx-24 px-5 gap-y-6">
        <h3 className=" bg-neutral-50 font-bold font-serif text-xl leading-8 text-neutral-800 col-span-full md:col-start-3 md:col-span-8">
          Comments
        </h3>
        <div className="col-span-full md:col-start-3 md:col-span-8">
          <div className="border border-neutral-400 rounded-md px-7 py-5 mb-4">
            <p className="font-bold text-lg text-neutral-800">Sarah <span className="ml-1 text-neutral-400 text-sm font-extralight">Feb 8, 2022</span></p>
            <p className="mt-2 text-neutral-800">Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.</p>
          </div>
          <div className="border border-neutral-400 rounded-md px-7 py-5 mb-4">
            <p className="font-bold text-lg text-neutral-800">Sarah <span className="ml-1 text-neutral-400 text-sm font-extralight">Feb 8, 2022</span></p>
            <p className="mt-2 text-neutral-800">Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.</p>
          </div>
          <div className="border border-neutral-400 rounded-md px-7 py-5 mb-4">
            <p className="font-bold text-lg text-neutral-800">Sarah <span className="ml-1 text-neutral-400 text-sm font-extralight">Feb 8, 2022</span></p>
            <p className="mt-2 text-neutral-800">Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.</p>
          </div>
          <div className="border border-neutral-400 rounded-md px-7 py-5 mb-4">
            <p className="font-bold text-lg text-neutral-800">Sarah <span className="ml-1 text-neutral-400 text-sm font-extralight">Feb 8, 2022</span></p>
            <p className="mt-2 text-neutral-800">Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.</p>
          </div>
          <h3 className="mt-10 bg-neutral-50 font-bold font-serif text-xl leading-8 text-neutral-800 col-span-full md:col-start-3 md:col-span-8">
            Join the discussion
          </h3>
          <div className="mt-6 flex gap-x-3">
            <img className="w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" alt="" />
            <div className="w-full">
              <textarea placeholder="Write a comment" rows="3" className="bg-neutral-50 placeholder-neutral-400 w-full border border-neutral-400 rounded-md px-4 py-3 sm:px-7 sm:py-5" />
              <button className="mt-1 h-9 font-extralight text-sm font-serif px-5 rounded-md bg-neutral-900 text-white hover:bg-neutral-700 transition duration-200 ease-in-out">Post</button>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-16"></div>
    </div>
  )
}

export default CommentSection