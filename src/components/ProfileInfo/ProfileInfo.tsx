import React from 'react';
import c from "../../Content/content.module.css";
import mainPhoto from "../../assets/main.jpg";
import {useAppSelector} from "../../redux/store";

export const ProfileInfo = () => {
    const userData = useAppSelector(state => state.profileReducer.profile)
    console.log("userData ", userData)
    return (
        <div>
            {userData === null ? "" : <img src={userData.photos.large}/>}
            <img alt={"main photo"} className={c.MainImg} src={mainPhoto}/>
            <div>
                ava + description
            </div>
        </div>
    );
};

