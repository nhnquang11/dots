const Stats = () => {
  return (
    <div className="mb-20 mx-10">
      <h3 className="mt-12 font-serif text-4xl">Currently there are...</h3>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 rounded-lg gap-3">
        <div className="px-8 py-10 border rounded shadow-sm hover:shadow-lg cursor-pointer">
          <dt className="font-serif text-sm text-neutral-500">Visitors</dt>
          <dd className="font-serif text-3xl mt-1">30034</dd>
        </div>
        <div className="px-8 py-10 border rounded shadow-sm hover:shadow-lg cursor-pointer">
          <dt className="font-serif text-sm text-neutral-500">Comments</dt>
          <dd className="font-serif text-3xl mt-1">224</dd>
        </div>
        <div className="px-8 py-10 border rounded shadow-sm hover:shadow-lg cursor-pointer">
          <dt className="font-serif text-sm text-neutral-500">Stories</dt>
          <dd className="font-serif text-3xl mt-1">121</dd>
        </div>
        <div className="px-8 py-10 border rounded shadow-sm hover:shadow-lg cursor-pointer">
          <dt className="font-serif text-sm text-neutral-500">Reactions</dt>
          <dd className="font-serif text-3xl mt-1">88</dd>
        </div>
      </div>
    </div>
  )
}

export default Stats