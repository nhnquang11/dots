import { useSelector } from "react-redux"
import userService from "../services/userService"
import { useState } from "react"
import { useField } from "../hooks"
import uploadService from "../services/uploadService"
import { updateUser } from "../reducers/userReducer"
import { useDispatch } from "react-redux"
import Notification from "../components/Notification"

const Profile = () => {
  const user = useSelector(state => state.user)
  const [tempPic, setTempPic] = useState(null)
  const username = useField('text', user.username)
  const name = useField('text', user.name)
  const email = useField('email', user.email)
  const profilePic = useField('file', user.profilePic)
  const password = useField('password')
  const dispatch = useDispatch()
  const [updating, setUpdating] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [timeoutId, setTimeoutId] = useState(null)

  const uploadImage = (e) => {
    setTempPic(e.target.files[0])
    profilePic.setValue(URL.createObjectURL(e.target.files[0]))
  }

  const updateInfo = async () => {
    setUpdating(true)

    let imageUrl = profilePic.value
    if (tempPic) {
      const response = await uploadService.uploadImage(tempPic)
      imageUrl = response.imageUrl
    }

    const updatedUser = {
      username: username.value,
      name: name.value,
      email: email.value,
      profilePic: imageUrl,
      password: password.value
    }

    if (password.value === '') {
      delete updatedUser.password
    }

    userService.update(user.id, updatedUser).then((data) => {
      dispatch(updateUser({
        name: data.name,
        username: data.username,
        email: data.email,
        profilePic: data.profilePic
      }))
      setUpdating(false)
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
      }, 5000)
    }).catch((error) => {
      setErrorMessage(error.response.data.error)
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      setTimeoutId(setTimeout(() => {
        setErrorMessage(null)
        setTimeoutId(null)
      }, 5000))
      setUpdating(false)
    })
  }

  return (
    <div className="z-40">
      {errorMessage && <Notification message={errorMessage} type="error" />}
      <h3 className="mt-20 font-serif font-semibold text-3xl sm:text-4xl text-center px-5">Account Information</h3>
      <div className="mt-12 mb-16">
        <div className="flex items-center justify-center">
          <input id="profile-pic" hidden type="file" accept="image/*" onChange={uploadImage} />
          <label htmlFor="profile-pic" className="relative cursor-pointer">
            <img src={profilePic.value} className="z-20 border-[1.5px] border-neutral-600 p-[1.5px] rounded-full w-32 h-32 object-cover cursor-pointer" alt=""></img>
            <div className="font-serif text-xs text-neutral-50 opacity-0 bg-black hover:opacity-90 hover:bg-opacity-40 rounded-full absolute flex justify-center items-center w-32 h-32 top-0 right-0 transition ease-in-out duration-100">Upload image</div>
          </label>
        </div>
        <div className="flex flex-col items-center gap-y-4 px-4 mt-10">
          <div className="max-w-md w-full">
            <label htmlFor="user-id" className="font-serif block mb-2 text-sm font-semibold text-neutral-900">User ID</label>
            <input type="text" name="user-id" id="user-id" className="font-serif bg-gray-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none cursor-text" disabled value={user.id} required="" />
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
          {
            updating ? (
              <button disabled type="button" className="flex items-center justify-center mt-2 max-w-md w-full font-serif bg-neutral-900 text-neutral-50 rounded-lg text-sm p-2.5 hover:bg-neutral-800">
                <svg aria-hidden="true" className="w-4 h-4 text-neutral-50 animate-spin fill-neutral-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="ml-2">Updating...</span>
              </button>
            ) : (
              <button onClick={updateInfo} className="mt-2 max-w-md w-full font-serif bg-neutral-900 text-neutral-50 rounded-lg text-sm p-2.5 hover:bg-neutral-800">Update</button>
            )
          }
          {
            showSuccess && (
              <div className="border-green-700 border flex items-center justify-center mt-2 max-w-md w-full font-serif bg-green-50 text-green-800 rounded-lg text-sm p-2.5">
                Your information has been updated successfully.
              </div>
            )
          }

        </div>
      </div>
    </div>
  )
}

export default Profile