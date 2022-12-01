import {Dispatch} from "redux";
import {usersApi} from "../Api/users-api";

const initialState = {
    profile: null,
    posts: [
        {id: 1, message: "Winter is coming"},
        {id: 2, message: "I lost my motivation"},
    ],
    newPostText: ""
}

export type TPosts = {
    id: number,
    message: string
}

export type profileReducerT = {
    posts: TPosts[],
    newPostText: string,
    profile: any
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
        default:
            return state
    }
}

export const addPostAC = (newPostText: string) => ({type: "ADD-POST", newPostText} as const);
export const addNewTextAC = (newText: string) => ({type: "ADD-TEXT", newText} as const);
export const userPage = (data: any) => ({type: "ADD-USERS-PAGE", data} as const);

export const getUserIdProfile = (userId: number) => (dispatch: Dispatch) => {
    usersApi.getUserProfile(userId)
        .then(res => {
            dispatch(userPage(res.data))
        })
}


type addNewTextT = ReturnType<typeof addNewTextAC>
type addPostT = ReturnType<typeof addPostAC>

type ActionsT = addPostT | addNewTextT | ReturnType<typeof userPage>
