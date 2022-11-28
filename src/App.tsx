import React from 'react';
import './App.css';
import {Header} from "./Header/Header";
import {Navbar} from "./nav/Navbar";
import {Profile} from "./Profile/Profile";
import {Dialogs} from "./Dialogs/Dialogs";
import {Route, Navigate, Routes} from 'react-router-dom'
import {Users} from "./components/Users/Users";

const App = () => {
    return (
        <div className="App">
            <Header/>
            <Navbar/>
            <Routes>
                <Route  path={'/profile'} element={<Profile/>} />
                <Route path={'/dialogs'} element={<Dialogs/>} />
                <Route path={'/users'} element={<Users/>} />
                {/*<Route path={PATH.JUNIOR_PLUS} element={<JuniorPlus/>} />*/}
                <Route path={'*'} element={<Navigate to={'/profile'}/>} />
                {/*<Route path={'/404'} element={<Error404 />} />*/}
            {/*<Profile/>*/}
            </Routes>
        </div>
    );
}





export default App;
