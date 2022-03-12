import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { MemeCardType, UserType } from "../types/types";

const initialState: MemeCardType[] = [];

export const counterSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<MemeCardType>) => {
      let curr_state = current(state);
      return [
        ...curr_state,
        {
          key: action.payload.key,
          href: action.payload.href,
          like: action.payload.like,
          dislike: action.payload.dislike,
          download: action.payload.download,
          owner_id: action.payload.owner_id,
        },
      ];
    },
    addCardList: (state, action: PayloadAction<MemeCardType[]>) => {
      let curr_state = current(state);
      return [...curr_state, ...action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCard, addCardList } = counterSlice.actions;

export default counterSlice.reducer;
