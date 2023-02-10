import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: JSON.parse(localStorage.getItem('user'))  || null,
    loading: false,
}

  

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state, action) => {

        
        state.user = null
    },
    loginSuccess: (state, action) => {
         state.user = action.payload
    },
    loginFailure: (state, action) => {
        state.user = null
    },
    logout: (state, action) => {
        state.user = null
    }
  }
});




export const AuthActions = AuthSlice.actions

export default AuthSlice.reducer