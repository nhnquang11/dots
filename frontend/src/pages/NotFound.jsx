import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-neutral-50 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="font-serif text-base font-semibold text-neutral-600">404</p>
          <h1 className="font-serif mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
          <p className="font-serif mt-6 text-base leading-7 text-neutral-600">Sorry, we couldn’t find the page you’re looking for.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/" className="flex items-center my-14 h-11 font-extralight text-sm font-serif px-5 rounded bg-neutral-900 text-white hover:bg-neutral-600 transition duration-200 ease-in-out">
              Go back home
            </Link>
            <a href="#" className="font-serif text-sm font-semibold hover:text-neutral-600 text-neutral-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  )
}