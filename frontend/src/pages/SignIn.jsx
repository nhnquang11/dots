import logo from '../assets/dots.png'
import { Link } from 'react-router-dom'
import { useField } from '../hooks'
import axios from 'axios'

const SignIn = () => {
  const email = useField('email')
  const password = useField('password')

  const logIn = async (e) => {
    e.preventDefault()
    console.log(email.value)
    console.log(password.value)
    await axios.post('http://localhost:3001/api/login', {
      email: email.value,
      password: password.value
    }).then(response => {
      console.log(response.data)
    })
    // email.reset()
    // password.reset()
    console.log('Logging in')
  }

  const getAttributes = (field) => {
    const { reset, ...attributes } = field
    return attributes
  }

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
            Log in
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="font-serif block text-sm font-medium leading-6 text-neutral-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  {...getAttributes(email)}
                  id="email"
                  name="email"
                  autoComplete="email"
                  placeholder='email@example.com'
                  required
                  className="font-serif px-3 py-2 block w-full bg-neutral-50 rounded-md border-0  text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 focus:outline-neutral-500 focus:ring-inset sm:text-sm sm:leading-6"
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
                  {...getAttributes(password)}
                  id="password"
                  name="password"
                  autoComplete="password"
                  placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                  required
                  className="font-serif px-3 py-2 block w-full bg-neutral-50 rounded-md border-0  text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 focus:outline-neutral-500 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="font-serif flex w-full justify-center rounded-md bg-neutral-50 border border-neutral-600 px-3 py-1.5 text-sm font-semibold leading-6 text-neutral-900 shadow-sm hover:bg-neutral-100 hover:border-neutral-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                onClick={logIn}
              >
                Log in
              </button>
            </div>
          </form>

          <button
            className="mt-5 font-serif flex w-full justify-center rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Continue with Google
          </button>

          <p className="font-serif mt-10 text-center text-sm text-neutral-500">
            Don&apos;t have an account?{' '}
            <Link to="/sign-up" className="ml-1 text-sm font-bold leading-6 text-neutral-600 hover:text-neutral-500">
              Create new account
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default SignIn