import React from 'react';
import '../App.css';
import logo from "../assets/logo.jpeg"
import h from "./Header.module.css"
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {logoutTC, setUserAuthDataTC} from "../redux/auth-reducer";

export const Header = () => {
    const dispatch = useAppDispatch()
    const userLogin = useAppSelector(state => state.authReducer.login)
    const isAuth = useAppSelector(state => state.authReducer.isAuth)

    const authMeHandler = () => {
        dispatch(setUserAuthDataTC())
    }

    const logoutHandler = () => {
        dispatch(logoutTC())
    }
    return <>
        <header className={h.main}>
            {isAuth ? <span className={h.loginMain}> {userLogin} </span> :
                <NavLink to={"/login"} onClick={authMeHandler} className={h.loginMain}>Login</NavLink>}
            {isAuth && <button className={h.loginMain} onClick={logoutHandler}>Log out</button>}
            <img className={h.img} src={logo}/>
        </header>


    </>
}


