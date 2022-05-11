import * as userActionCreators from "src/redux/user/action-creators";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import rootReducer from "src/redux/reducer";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
export type InferValueTypes<T> = T extends { [key: string]: infer U }
    ? U
    : never;
export type ActionCreators = typeof userActionCreators;
export type ActionType = ReturnType<InferValueTypes<ActionCreators>>;
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch &
    ThunkDispatch<RootState, null, ActionType>;
export const useRootDispatch = () => useDispatch<RootDispatch>();
export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
