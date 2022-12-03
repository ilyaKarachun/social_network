import React, {useEffect} from 'react';
import './App.css';
import {Header} from "./Header/Header";
import {Navbar} from "./nav/Navbar";
import {Profile} from "./Profile/Profile";
import {Dialogs} from "./Dialogs/Dialogs";
import {Route,  Routes} from 'react-router-dom'
import {Users} from "./components/Users/Users";
import {useDispatch, useSelector} from "react-redux";
import {isLoading, setUsers, setUsersTotalCount} from "./redux/users-reducer";
import {usersApi} from "./Api/users-api";
import {AppRootStateType} from "./redux/store";
import {Login} from "./components/Login/Login";

const App = () => {
    const dispatch = useDispatch()
    const currentPage = useSelector<AppRootStateType, number>(state => state.usersReducer.currentPage)
    const pageSize = useSelector<AppRootStateType, number>(state => state.usersReducer.pageSize)
    useEffect(() => {
        dispatch(isLoading(true))
        usersApi.getUsers(currentPage, pageSize).then(res => {
            dispatch(setUsers(res.data.items))
            dispatch(setUsersTotalCount(res.data.totalCount))
            dispatch(isLoading(false))
        })
    }, [currentPage])
    return (
        <div className="App">
            <Header/>
            <Navbar/>
            <Routes>
                <Route  path={'/profile'} element={<Profile/>} />
                <Route  path={'/profile/*'} element={<Profile/>} />
                <Route path={'/dialogs'} element={<Dialogs/>} />
                <Route path={'/users'} element={<Users/>} />
                <Route path={'/login'} element={<Login/>} />
                {/*<Route path={PATH.JUNIOR_PLUS} element={<JuniorPlus/>} />*/}
                {/*<Route path={'*'} element={<Navigate to={'/profile'}/>} />*/}
                {/*<Route path={'/404'} element={<Error404 />} />*/}
            {/*<Profile/>*/}
            </Routes>
        </div>
    );
}





export default App;
