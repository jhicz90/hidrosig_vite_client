import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { WebRoot, AppRoot, LoginPage } from '../modules'
import { LoadingOverlay } from '../components'
import { checkingToken, useAuthRefreshQuery } from '../store/actions'

export const Router = () => {
    const dispatch = useDispatch()
    const { uid, checkToken } = useSelector(state => state.auth)
    const { isLoading } = useAuthRefreshQuery()

    useEffect(() => {
        onstorage = () => {
            const token = localStorage.getItem('token')
            if (!token) dispatch(checkingToken())
        }
    }, [])

    if (checkToken || isLoading) {
        return (
            <div
                style={{
                    position: 'relative',
                    height: '100vh'
                }}
            >
                <LoadingOverlay bgTransparent={true} />
            </div>
        )
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path={`/`} element={<Navigate to={`/web`} />} />
                <Route path={`/web/*`} element={<WebRoot />} />
                <Route path={`/login`} element={!uid ? <LoginPage /> : <Navigate to={`/app`} />} />
                <Route path={`/app/*`} element={uid ? <AppRoot /> : <Navigate to={`/login`} replace />} />
                <Route path={`/*`} element={<Navigate to={`/web`} />} />
            </Routes>
        </BrowserRouter>
    )
}