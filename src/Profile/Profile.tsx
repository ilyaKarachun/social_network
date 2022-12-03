import React, {useEffect} from 'react';
import '../App.css';
import c from "../Content/content.module.css"
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "../components/ProfileInfo/ProfileInfo";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../redux/store";


export const Profile = () => {
    let navigate = useNavigate();
    const isAuth = useAppSelector(state => state.authReducer.isAuth)

    useEffect(() => {
        if (!isAuth){
            return navigate("/login");
        }
    },[isAuth]);

    return <div className={c.content}>
        <ProfileInfo />
        <MyPosts/>
    </div>
}

