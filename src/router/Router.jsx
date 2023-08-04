import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { WebRoot, AppRoot, LoginPage } from '../modules'
import { useAuthStore } from '../hooks'

export const Router = () => {

    const { uid } = useAuthStore()

    return (
        <Routes>
            <Route path={`/`} element={<Navigate to={`/web`} />} />
            <Route path={`/web/*`} element={<WebRoot />} />
            <Route path={`/login`} element={!uid ? <LoginPage /> : <Navigate to={`/app`} />} />
            <Route path={`/app/*`} element={uid ? <AppRoot /> : <Navigate to={`/login`} replace />} />
            <Route path={`/*`} element={<Navigate to={`/web`} />} />
        </Routes>
    )
}