import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    activeUser: null,
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setActiveUser(state, action) {
      state.activeUser = action.payload;
    },
    logout(state) {
      state.token = null;
      state.activeUser = null;
    },
  },
});

export const { setToken, setActiveUser, logout } = authSlice.actions;
export default authSlice.reducer;
