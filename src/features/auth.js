import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: sessionStorage.getItem("token") ? true : false,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { token, ...user } = action.payload;
      console.log(user);
      state.isAuthenticated = true;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));
    },
    logout: (state, action) => {
      state.isAuthenticated = false;
      sessionStorage.clear();
    },
  },
});

export const { setUser, logout } = auth.actions;

export default auth.reducer;
