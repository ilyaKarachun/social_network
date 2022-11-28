import {combineReducers, legacy_createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {usersReducer} from "./users-reducer";

const state = combineReducers({
    profileReducer,
    dialogsReducer,
    usersReducer,
})

export const store = legacy_createStore(state)

export type AppRootStateType = ReturnType<typeof state>