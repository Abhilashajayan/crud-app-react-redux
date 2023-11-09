import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    allUsers: [],
    admin : null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            console.log('action payload:', action.payload);
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        updateProfile: (state, action) => {
            state.user = action.payload;
        },
        getUsers: (state, action) => {
            state.allUsers = action.payload.users
        },
        authCheck: (state, action) => {
            state.admin = action.payload.admin;
        },
        adminLogout: (state) => {
        state.admin = null;
        },
        userEdit: (state, action) => {
            const updatedUser = action.payload;
            state.allUsers = state.allUsers.map(user =>
              user._id === updatedUser._id ? updatedUser : user
            );
          },
    },
});

export const { setLogin, setLogout, updateProfile, getUsers ,authCheck ,adminLogout,userEdit  } = authSlice.actions;
export default authSlice.reducer;