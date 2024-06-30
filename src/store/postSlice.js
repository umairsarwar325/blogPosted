import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postsData: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    readPosts: (state, action) => {
      state.postsData.push(action.payload.postData);
    },
    clearPosts: (state, action) => {
      state.postsData = [];
    },
  },
});

export const { readPosts,clearPosts } = postSlice.actions;
export default postSlice.reducer;
