import { configureStore } from "@reduxjs/toolkit";
import structureReducer from "./slices/structure.slice";
import stateControllerReducer from "./slices/state-controller.slice";
import baseEditorReducer from "./slices/base-editor.slice";
import tabsReducer from "./slices/tabs.slice";

const store = configureStore({
  reducer: {
    structure: structureReducer,
    stateController: stateControllerReducer,
    baseEditor: baseEditorReducer,
    tabs: tabsReducer,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
