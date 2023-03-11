import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { UserFarmNavPage, ImportUserPage, UserFarmListPage } from '..'

export const UserFarmRoutes = () => {
    return (
        <Routes>
            <Route element={<UserFarmNavPage />}>
                <Route index element={<Navigate to={`users`} replace />} />
                <Route
                    path={`users`}
                    element={
                        <GuardRoute meta={['organization_junta']}>
                            <UserFarmListPage />
                        </GuardRoute>
                    }
                />
                <Route
                    path={`import`}
                    element={
                        <GuardRoute meta={['organization_comm']}>
                            <ImportUserPage />
                        </GuardRoute>
                    }
                />
            </Route>
        </Routes>
    )
}
