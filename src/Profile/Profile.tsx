import React, {FC, useEffect} from 'react';
import '../App.css';
import c from "../Content/content.module.css"
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "../components/ProfileInfo/ProfileInfo";
import {Navigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {setUserStatusTC} from "../redux/profile-reducer";


export const Profile= () => {
    const isAuth = useAppSelector(state => state.authReducer.isAuth)
    let userId: number | null = Number(useParams<'userId'>().userId)
    const myUserID = useAppSelector(state => state.authReducer.id);

    if (Number.isNaN(userId)) {
        userId = myUserID;
    }
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (userId) {
            dispatch(setUserStatusTC(userId));
        }
    }, [userId, dispatch]);

    if (!isAuth){
        return <Navigate to={'/login'}/>
    }
    return <div className={c.content}>
        <ProfileInfo />
        <MyPosts/>
    </div>
}



