import {Dispatch} from "redux";
import {usersApi} from "../Api/users-api";

const initialState: initStateT = {
    users: [],
    pageSize: 20,
    totalUsersCount: 5,
    currentPage: 1,
    loader: false
}


export type TUsers = {
    name: string,
    id: number,
    photos: {
        small: string,
        large: string
    },
    status: string,
    followed: boolean,
}

type initStateT = {
    users: TUsers[],
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    loader: boolean,
}

export const usersReducer = (state = initialState, action: ActionsT): initStateT  => {
    switch (action.type) {
        case "FOLLOW-UNFOLLOW": {
            return {
                ...state,
                users: state.users.map((u) => u.id === action.userID ? {...u, followed: !u.followed} : u)}
        }
        case "SET-USERS": {
            return {
                ...state, users: action.user,
                // totalUsersCount: action.user.
            }
        }
        case "SET-USERS-TOTAL-COUNT": {
            return {
                ...state,
                totalUsersCount: action.usersCount
            }
        }
        case "CHANGE-NUMBER-PAGE": {
            return {
                ...state,
                currentPage: action.page
            }
        }
        case "SET-LOADING": {
           return {
               ...state,
               loader: action.isLoading
           }

        }
        default:
            return state
    }
}

export const changeFollow = (userID: number) => ({type: "FOLLOW-UNFOLLOW", userID} as const);
export const setUsers = (user: TUsers[]) => ({type: "SET-USERS", user} as const);
export const changeNumberPage = (page: number) => ({type: "CHANGE-NUMBER-PAGE", page} as const);
export const setUsersTotalCount = (usersCount: number) => ({type: "SET-USERS-TOTAL-COUNT", usersCount} as const);
export const isLoading = (isLoading: boolean) => ({type: "SET-LOADING", isLoading} as const);

export const followTC = (userId: number) => async (dispatch: Dispatch) => {
    const res = await usersApi.followUser(userId)
    debugger
    console.log("result follow ", res)
    if (res.data.resultCode === 0) {
        dispatch(changeFollow(userId))
    }
}

export const unfollowTC = (userId: number) => async (dispatch: Dispatch) => {
    const res = await usersApi.unfollowUser(userId)
    debugger
    if (res.data.resultCode === 0) {
        debugger
        dispatch(changeFollow(userId))
    }
}

type ActionsT = ReturnType<typeof changeFollow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof changeNumberPage>
    | ReturnType<typeof setUsersTotalCount>
    | ReturnType<typeof isLoading>

