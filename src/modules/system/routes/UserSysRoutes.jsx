import { Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { UserSysActivePage, UserSysListPage } from '../pages'

export const UserSysRoutes = () => {
    return (
        <Routes>
            <Route
                index
                element={
                    <GuardRoute meta={['user_management']}>
                        <UserSysListPage />
                    </GuardRoute>
                }
            />
            <Route
                path={`/:userid`}
                element={
                    <GuardRoute meta={['user_management']}>
                        <UserSysActivePage />
                    </GuardRoute>
                }
            />
        </Routes>
    )
}
