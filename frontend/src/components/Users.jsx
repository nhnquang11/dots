import { useEffect, useState } from 'react'
import userSevice from '../services/userService'
import { newestToOldest } from '../utils'
import { dateFormat } from '../utils'
import crossIcon from "../assets/cross.png"
import checkIcon from "../assets/check.png"
import ConfirmationModal from './ConfirmationModal'

const Users = () => {
  const [numToShow, setNumToShow] = useState(5)
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState(null)
  const [modalId, setModalId] = useState(null)

  useEffect(() => {
    userSevice.getAll().then((data) => {
      console.log(data)
      setUsers(data.sort(newestToOldest))
    })
  }, [])

  const loadMoreUsers = () => {
    setNumToShow(numToShow + 5)
  }

  const handleDelete = (id, username) => {
    setMessage(`Are you sure you want to delete ${username}?`)
    setModalId(id)
  }

  const handleClose = () => {
    setMessage(null)
    setModalId(null)
  }

  const deleteUser = (id) => {
    userSevice.remove(id).then(() => {
      setUsers(users.filter(user => user.id !== id))
    })
    handleClose()
  }

  return (
    <div className="mb-20 px-3 mx-auto max-w-screen-xl">
      {modalId && message && <ConfirmationModal message={message} handleClose={handleClose} handleSubmit={() => deleteUser(modalId)} />}
      <h3 className="mt-16 font-serif text-neutral-900 font-semibold text-4xl text-center px-2">Users</h3>
      <div className="mt-10 font-serif flex items-center justify-center w-full overflow-x-auto border rounded">
        <table className="w-full text-sm text-left text-neutral-500 table-auto">
          <thead className="text-xs text-neutral-700 uppercase bg-neutral-100">
            <tr>
              <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">#</th>
              <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">Created</th>
              <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">Avatar</th>
              <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">Username</th>
              <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">Email</th>
              <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">Admin</th>
              <th scope="col" className="py-3 px-4 sm:py-4 sm:px-6">Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              users.slice(0, numToShow).map((user, index) => (
                <tr key={user.id} className="border-t bg-neutral-50">
                  <td className="py-3 px-4 sm:py-4 sm:px-6">{index + 1}</td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6">{dateFormat(user.registrationDate)}</td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6">
                    <img className='w-10 h-10 object-cover rounded-full' src={user.profilePic} alt="" />
                  </td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6">{user.username}</td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6">{user.email}</td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6">
                    <img className='w-5 h-5' src={user.isAdmin ? checkIcon : crossIcon} alt="" />
                  </td>
                  <td className="py-3 px-4 sm:py-4 sm:px-6">
                    <button className="border border-neutral-600 rounded px-2 py-1 text-xs text-neutral-800 hover:bg-neutral-800 hover:text-neutral-50" onClick={() => handleDelete(user.id, user.name)}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      {
        numToShow < users.length && (
          <div className="mt-3 flex justify-center">
            <button onClick={loadMoreUsers} className="leading-8 font-extralight text-sm font-serif px-3 rounded bg-neutral-900 text-white hover:bg-neutral-600 transition duration-100 ease-in-out">
              Load more
            </button>
          </div>
        )
      }
    </div>
  )
}

export default Users