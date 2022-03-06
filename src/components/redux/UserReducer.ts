import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../types/types";
import { MEME_STORAGE } from "../utils/contant";

const initialState: UserType = {
  user_id: "",
  user_name: "",
  user_desc: "",
  img_url: "",
};

const init = () => {
  const user = JSON.parse(
    sessionStorage.getItem(`${MEME_STORAGE}singleuser`) || "{}"
  );
  if (user) {
    initialState.user_id = user.user_id;
    initialState.user_name = user.user_name;
    initialState.user_desc = user.user_desc;
    initialState.img_url = user.img_url;
  }
};

init();

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserType>) => {
      state.user_id = action.payload.user_id;
      state.user_name = action.payload.user_name;
      state.user_desc = action.payload.user_desc;
      state.img_url = action.payload.img_url;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser } = counterSlice.actions;

export default counterSlice.reducer;
