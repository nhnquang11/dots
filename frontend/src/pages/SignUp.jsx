import logo from '../assets/dots.png'

export default function SignUp() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-16 w-auto"
            src={logo}
            alt="Your Company"
          />
          <h2 className="font-serif mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create new account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label htmlFor="username" className="font-serif block text-sm font-medium leading-6 text-neutral-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="email"
                  required
                  className="font-serif px-3 py-2 block w-full bg-neutral-50 rounded-md border-0  text-neutral-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-neutral-500 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="font-serif block text-sm font-medium leading-6 text-neutral-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="font-serif px-3 py-2 block w-full bg-neutral-50 rounded-md border-0  text-neutral-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-neutral-500 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="font-serif block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  required
                  className="font-serif px-3 py-2 block w-full bg-neutral-50 rounded-md border-0  text-neutral-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-neutral-500 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="font-serif flex w-full justify-center rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="font-serif mt-10 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/sign-in" className="ml-1 text-sm font-bold leading-6 text-neutral-600 hover:text-neutral-500">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </>
  )
}