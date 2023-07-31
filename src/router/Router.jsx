import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'

import { WebRoot, AppRoot, LoginPage } from '../modules'
import { LoadingLottie } from '../components'
import { checkingToken, useAuthRefreshQuery } from '../store/actions'
import { AuthMiddleware } from '../guards'

export const Router = () => {
    
    const { uid } = useSelector(state => state.auth)
    // const { isLoading } = useAuthRefreshQuery()

    // useEffect(() => {
    //     onstorage = () => {
    //         const token = localStorage.getItem('token')
    //         if (!token) dispatch(checkingToken())
    //     }
    // }, [])

    // if (isLoading) {
    //     return (
    //         <LoadingLottie />
    //     )
    // }

    return (
        <BrowserRouter>
            <CookiesProvider>
                <AuthMiddleware>
                    <Routes>
                        <Route path={`/`} element={<Navigate to={`/web`} />} />
                        <Route path={`/web/*`} element={<WebRoot />} />
                        <Route path={`/login`} element={!uid ? <LoginPage /> : <Navigate to={`/app`} />} />
                        <Route path={`/app/*`} element={uid ? <AppRoot /> : <Navigate to={`/login`} replace />} />
                        <Route path={`/*`} element={<Navigate to={`/web`} />} />
                    </Routes>
                </AuthMiddleware>
            </CookiesProvider>
        </BrowserRouter>
    )
}