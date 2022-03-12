import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserReducer";
import MemeReducer from "./MemeReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
};
const reducers = combineReducers({
  user: UserReducer,
  cards: MemeReducer,
});
const persist_reducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persist_reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
