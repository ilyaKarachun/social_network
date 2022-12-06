import {Dispatch} from "redux";
import {profileApi, usersApi} from "../Api/users-api";

const initialState: profileReducerT = {
    profile: null,
    posts: [
        {id: 1, message: "Winter is coming"},
        {id: 2, message: "I lost my motivation"},
    ],
    newPostText: "",
    status: ""
}

export type TPosts = {
    id: number,
    message: string
}

export type profileReducerT = {
    posts: TPosts[],
    newPostText: string,
    profile: any,
    status: string,
}

export const profileReducer = (state = initialState, action: ActionsT): profileReducerT => {
    switch (action.type) {
        case "ADD-POST": {
            return {...state, posts: [...state.posts, {id: 5, message: action.newPostText}], newPostText: ""}
        }
        case "ADD-TEXT": {
            return {...state, newPostText: action.newText}
        }
        case "ADD-USERS-PAGE": {
            return {
                ...state,
                profile: action.data
            }
        }
        case "SET-USER-STATUS": {
            return {
                ...state,
                status: action.status
            }
        }
        default:
            return state
    }
}

export const addPostAC = (newPostText: string) => ({type: "ADD-POST", newPostText} as const);
export const addNewTextAC = (newText: string) => ({type: "ADD-TEXT", newText} as const);
export const userPage = (data: any) => ({type: "ADD-USERS-PAGE", data} as const);
export const setUserStatus = (status: string) => ({type: "SET-USER-STATUS", status} as const);

export const setUserStatusTC = (userId: number) => async (dispatch: Dispatch) => {
    const res = await profileApi.getUserStatus(userId)
    dispatch(setUserStatus(res.data))
}

export const updateUserStatusTC = (status: string) => async (dispatch: Dispatch) => {
    const res = await profileApi.updateStatus(status)
    debugger
    console.log("profile-reducer ", res)
    if(res.data.resultCode === 0) {
        dispatch(setUserStatus(status))
    }
}


export const getUserIdProfile = (userId: number) => async (dispatch: Dispatch) => {
    const res = await usersApi.getUserProfile(userId)
    dispatch(userPage(res.data))
}


type addNewTextT = ReturnType<typeof addNewTextAC>
type addPostT = ReturnType<typeof addPostAC>
type SetUserStatusT = ReturnType<typeof setUserStatus>

type ActionsT = addPostT | addNewTextT | ReturnType<typeof userPage> | SetUserStatusT
