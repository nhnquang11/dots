import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      console.log('action', action)
      return action.payload
    },
    signOut: () => {
      return null
    },
    updateUser: (state, action) => {
      return {...state, ...action.payload }
    }
  },
})

export const { setUser, signOut, updateUser } = userSlice.actions

export default userSlice.reducer