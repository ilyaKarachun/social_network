import {combineReducers, legacy_createStore} from "redux";
import {profileReducer} from "./profile-reducer";

const state = combineReducers({
    profileReducer
})

export const store = legacy_createStore(state)

export type AppRootStateType = ReturnType<typeof state>