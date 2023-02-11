import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";
import generalReducer from "../slices/generalSlice";
import userReducer from "../slices/userSlice";

export const store = configureStore({
  reducer: {
    general: generalReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["general/setSocket"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["general.socket"],
        // Ignore these paths in the state
        ignoredPaths: ["general.socket"]
      }
    })
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
