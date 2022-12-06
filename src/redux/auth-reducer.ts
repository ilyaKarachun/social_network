import {Dispatch} from "redux";
import {authApi, loginDataT, usersApi} from "../Api/users-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {isLoading} from "./users-reducer";
import {
    SetAppErrorActionType,
    SetAppInitializedActionType,
    setAppStatusAC,
    SetAppStatusActionType,
    setInitializedAC
} from "./app-reducer";

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
        case "SET-LOGOUT/LOGIN": {
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

export const setLogoutLogin = (value: boolean) => ({
    type: "SET-LOGOUT/LOGIN", value
} as const);

export const setUserAuthDataTC = () => async (dispatch: Dispatch) => {
    try {
        const res = await usersApi.authMe()
        if (res.data.resultCode === 0) {
            let {email, id, login} = res.data.data
            dispatch(setUserAuthData(email, id, login))
        } else {
            handleServerAppError(res.data, dispatch);
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
}

export const authMeTC = () => async (dispatch: Dispatch<ActionsT>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await usersApi.authMe()
        dispatch(setInitializedAC(true))
        if (res.data.resultCode === 0) {
            dispatch(setLogoutLogin(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch);
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
}

export const loginTC = (data: loginDataT) => async (dispatch: Dispatch) => {
    try {
        const res = await authApi.login(data)
        if (res.data.resultCode === 0) {
            let {email, id, login} = res.data.data
            dispatch(setUserAuthData(email, id, login))
        } else {
            handleServerAppError(res.data, dispatch);
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
            dispatch(setLogoutLogin(false))
        } else {
            handleServerAppError(res.data, dispatch);
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    } finally {
        dispatch(isLoading(false))
    }
}


type ActionsT = ReturnType<typeof setUserAuthData> |
    ReturnType<typeof setLogoutLogin>
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetAppInitializedActionType

