import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { UserType } from "../types/types";
import { MEME_STORAGE } from "../utils/contant";

interface InitialType {
  users: UserType[];
  currentuser: UserType;
}

const initialState: InitialType = {
  users: [],
  currentuser: {
    user_id: "",
    user_name: "",
    user_desc: "",
    img_url: "",
  },
};

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserType>) => {
      let curr_state = current(state);
      return {
        ...curr_state,
        currentuser: {
          user_id: action.payload.user_id,
          user_name: action.payload.user_name,
          user_desc: action.payload.user_desc,
          img_url: action.payload.img_url,
        },
      };
    },
    addUserList: (state, action: PayloadAction<UserType[]>) => {
      let curr_state = current(state);
      return {
        ...curr_state,
        users: [...action.payload],
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser, addUserList } = counterSlice.actions;

export default counterSlice.reducer;
