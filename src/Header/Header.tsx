import React from 'react';
import '../App.css';
import logo from "../assets/logo.jpeg"
import h from "./Header.module.css"

export const Header = () => {
    return <header className={h.main}>
        <img className={h.img} src={logo} />
    </header>
}


