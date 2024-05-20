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
    }
  },
})

export const { setUser, signOut } = userSlice.actions

export default userSlice.reducer