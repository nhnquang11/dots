import { useSelector } from "react-redux"
import userService from "../services/userService"
import { useEffect, useState } from "react"
import { useField } from "../hooks"

const Profile = () => {
  const user = useSelector(state => state.user)
  const [userDetails, setUserDetails] = useState(null)
  const username = useField('text')
  const name = useField('text')
  const email = useField('email')
  const profilePic = useField('file')
  const password = useField('password')

  useEffect(() => {
    userService.getOne(user.id).then((data) => {
      setUserDetails(data)
      console.log(data)
      username.setValue(data.username)
      name.setValue(data.name)
      email.setValue(data.email)
      profilePic.setValue(data.profilePic)
    })
  }, [])

  console.log(username)

  return (
    <div>
      <h3 className="mt-20 font-serif font-semibold text-4xl text-center px-2">Account Information</h3>
      {
        userDetails &&
        <div className="mt-12 mb-16">

          <div className="flex items-center justify-center">
            <div className="relative cursor-pointer">
              <img src={userDetails.profilePic} className="rounded-full w-32 h-32 object-cover cursor-pointer" alt=""></img>
              <div className="font-serif text-xs text-neutral-50 opacity-0 bg-black hover:opacity-90 hover:bg-opacity-40 rounded-full absolute flex justify-center items-center w-32 h-32 top-0 right-0 transition ease-in-out duration-100">Upload image</div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-y-4 px-4 mt-10">
            <div className="max-w-md w-full">
              <label htmlFor="user-id" className="font-serif block mb-2 text-sm font-semibold text-neutral-900">User ID</label>
              <input type="text" name="user-id" id="user-id" className="font-serif bg-gray-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none cursor-text" disabled value={userDetails.id} required="" />
            </div>
            <div className="max-w-md w-full">
              <label htmlFor="username" className="font-serif block mb-2 text-sm font-semibold text-neutral-900">Username</label>
              <input {...username.getAttributes()} type="text" name="username" id="username" className="font-serif bg-gray-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg block w-full p-2.5 focus:outline-neutral-500 focus:outline-[0.5px]" required="" />
            </div>
            <div className="max-w-md w-full">
              <label htmlFor="name" className="font-serif block mb-2 text-sm font-semibold text-neutral-900">Name</label>
              <input {...name.getAttributes()} type="text" name="name" id="name" className="font-serif bg-gray-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg block w-full p-2.5 focus:outline-neutral-500 focus:outline-[0.5px]" required="" />
            </div>
            <div className="max-w-md w-full">
              <label htmlFor="email" className="font-serif block mb-2 text-sm font-semibold text-neutral-900">Email</label>
              <input {...email.getAttributes()} type="text" name="email" id="email" className="font-serif bg-gray-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg block w-full p-2.5 focus:outline-neutral-500 focus:outline-[0.5px]" required="" />
            </div>
            <div className="max-w-md w-full">
              <label htmlFor="password" className="font-serif block mb-2 text-sm font-semibold text-neutral-900">Password</label>
              <input {...password.getAttributes()} placeholder="Password" type="password" name="password" id="password" className="font-serif bg-gray-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg block w-full p-2.5 focus:outline-neutral-500 focus:outline-[0.5px]" required="" />
            </div>
            <button className="mt-2 max-w-md w-full font-serif bg-neutral-900 text-neutral-50 rounded-lg text-sm p-2.5 hover:bg-neutral-800">Update</button>
          </div>
        </div>
      }
    </div>
  )
}

export default Profile