import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { UserSysListPage, UserSysNavPage, UserSysPage } from '../pages'

export const UserSysRoutes = () => {
    return (
        <Routes>
            <Route element={<UserSysNavPage />}>
                <Route index element={<Navigate to={`users`} replace />} />
                <Route
                    path={`users`}
                    element={
                        <GuardRoute meta={['organization_junta']}>
                            <UserSysListPage />
                        </GuardRoute>
                    }
                />
            </Route>
            <Route
                path={`users/:userid/*`}
                element={
                    <GuardRoute meta={['organization_junta']}>
                        <UserSysPage />
                    </GuardRoute>
                }
            />
        </Routes>
    )
}
