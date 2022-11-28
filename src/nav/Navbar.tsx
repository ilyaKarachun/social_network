import React from 'react';
import '../App.css';
import n from "./nav.module.css"
import {NavLink} from "react-router-dom";

export const Navbar = () => {
    return  <nav className={n.nav}>
        <div className={n.ul}>
            <NavLink to={'/profile'}
                className={n.item}
                     style={(param) => ({
                         color: param.isActive ? "darkred" : ""})}
            >
                Profile
            </NavLink>
            <NavLink to={'/dialogs'}
               className={n.item}
                     style={(param) => ({
                         color: param.isActive ? "darkred" : ""})}
            >
                Messages
            </NavLink>
            <NavLink to={'/users'}
                     className={n.item}
                     style={(param) => ({
                         color: param.isActive ? "darkred" : ""})}
            >
                Find friends
            </NavLink>
            <a href={''}
               className={n.item}
            >
                News
            </a>
            <a href={''}
               className={n.item}
            >
                Music
            </a>
            <a href={''}
               className={n.item}
            >
                Settings
            </a>
        </div>
    </nav>
}

