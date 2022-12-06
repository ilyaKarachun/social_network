import {Dispatch} from "redux";
import {authApi, loginDataT, usersApi} from "../Api/users-api";
import {handleServerNetworkError} from "../utils/error-utils";
import {isLoading} from "./users-reducer";

const initialState: initialStateT = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

export type initialStateT = {
    id: number | null,
    email: string | null,
    login: null | string,
    isAuth: boolean,
}

export const authReducer = (state = initialState, action: ActionsT): initialStateT => {
    switch (action.type) {
        case "SET-USER-AUTH-DATA": {
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        }
        case "SET-LOGOUT": {
            return {
                ...state,
                isAuth: action.value
            }
        }
        default:
            return state
    }
}

export const setUserAuthData = (email: string, id: number, login: string) => ({
    type: "SET-USER-AUTH-DATA", data: {
        email, id, login
    }
} as const);

export const setLogout = (value: boolean) => ({
    type: "SET-LOGOUT", value
} as const);

export const setUserAuthDataTC = () => async (dispatch: Dispatch) => {
    const res = await usersApi.authMe()
    if (res.data.resultCode === 0) {
        let {email, id, login} = res.data.data
        dispatch(setUserAuthData(email, id, login))
    }
}

export const loginTC = (data: loginDataT) => async (dispatch: Dispatch) => {
    try {
        const res = await authApi.login(data)
        if (res.data.resultCode === 0) {
            let {email, id, login} = res.data.data
            dispatch(setUserAuthData(email, id, login))
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    } finally {
        dispatch(isLoading(false))
    }

}

export const logoutTC = () => async (dispatch: Dispatch) => {
    try {
        const res = await authApi.logout()
        if (res.data.resultCode === 0) {
            dispatch(setLogout(false))
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    } finally {
        dispatch(isLoading(false))
    }
}


type ActionsT = ReturnType<typeof setUserAuthData> |
        ReturnType<typeof setLogout>

