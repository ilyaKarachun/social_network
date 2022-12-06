import React from 'react';
import c from "../../Content/content.module.css";
import mainPhoto from "../../assets/main.jpg";
import {useAppSelector} from "../../redux/store";
import {ProfileStatus} from "./ProfileStatus/ProfileStatus";

export const ProfileInfo = () => {
    const userData = useAppSelector(state => state.profileReducer.profile)
    console.log("userData ", userData)
    return (
        <div>
            {userData === null ? "" : <img src={userData.photos.large}/>}
            <img alt={"main photo"} className={c.MainImg} src={mainPhoto}/>
            <ProfileStatus/>
        </div>
    );
};

