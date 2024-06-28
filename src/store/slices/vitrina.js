import { createSlice } from '@reduxjs/toolkit'

export const vitrinaSlice = createSlice({
  name: 'vitrina',
  initialState: {
    city: null
  },
  reducers: {
    setCity: (state, action) => {
        state.city = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCity } = vitrinaSlice.actions

export default vitrinaSlice.reducer