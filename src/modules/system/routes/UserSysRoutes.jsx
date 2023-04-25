import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { OccupationListPage, RoleListPage, UserSysListPage, UserSysNavPage, UserSysPage } from '../pages'

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
                <Route
                    path={`role`}
                    element={
                        <GuardRoute meta={['role']}>
                            <RoleListPage />
                        </GuardRoute>
                    }
                />
                <Route
                    path={`occup`}
                    element={
                        <GuardRoute meta={['occup']}>
                            <OccupationListPage />
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
