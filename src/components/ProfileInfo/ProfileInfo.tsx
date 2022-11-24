import React from 'react';
import c from "../../Content/content.module.css";
import mainPhoto from "../../assets/main.jpg";

export const ProfileInfo = () => {
    return (
        <div>
            <img alt={"main photo"} className={c.MainImg} src={mainPhoto}/>
            <div>
                ava + description
            </div>
        </div>
    );
};

