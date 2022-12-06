import React, {useEffect} from 'react';
import './App.css';
import {Header} from "./Header/Header";
import {Navbar} from "./nav/Navbar";
import {Profile} from "./Profile/Profile";
import {Dialogs} from "./Dialogs/Dialogs";
import {Route,  Routes, Navigate} from 'react-router-dom'
import {Users} from "./components/Users/Users";
import {useDispatch, useSelector} from "react-redux";
import {isLoading, setUsers, setUsersTotalCount} from "./redux/users-reducer";
import {usersApi} from "./Api/users-api";
import {AppRootStateType, useAppDispatch} from "./redux/store";
import {Login} from "./components/Login/Login";
import {ErrorSnackbar} from "./utils/ErrorSnackBar";
import {authMeTC} from "./redux/auth-reducer";
import {CircularProgress} from "@mui/material";

const App = () => {
    const dispatch = useAppDispatch()

    const currentPage = useSelector<AppRootStateType, number>(state => state.usersReducer.currentPage)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.appReducer.isInitialized)
    const pageSize = useSelector<AppRootStateType, number>(state => state.usersReducer.pageSize)
    useEffect(() => {
        dispatch(isLoading(true))
        usersApi.getUsers(currentPage, pageSize).then(res => {
            dispatch(setUsers(res.data.items))
            dispatch(setUsersTotalCount(res.data.totalCount))
            dispatch(isLoading(false))
        })
        dispatch(authMeTC())
    }, [currentPage])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return (
        <div className="App">
            <ErrorSnackbar/>
            <Header/>
            <Navbar/>
            <Routes>
                <Route  path={'/profile'} element={<Profile/>} />
                <Route  path={'/'} element={<Profile/>} />
                <Route  path={'/profile/:userId'} element={<Profile/>} />
                <Route path={'/dialogs'} element={<Dialogs/>} />
                <Route path={'/users'} element={<Users/>} />
                <Route path={'/login'} element={<Login/>} />
                <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>} />
                <Route path='*' element={<Navigate to={"/404"}/>} />
            </Routes>

        </div>
    );
}





export default App;
