import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { UserFarmNavPage, UserFarmImportPage, UserFarmPage, UserFarmListPage, AreaFarmListPage } from '..'

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
                    path={`prps`}
                    element={
                        <GuardRoute meta={['organization_junta']}>
                            <AreaFarmListPage />
                        </GuardRoute>
                    }
                />
                <Route
                    path={`import`}
                    element={
                        <GuardRoute meta={['organization_comm']}>
                            <UserFarmImportPage />
                        </GuardRoute>
                    }
                />
            </Route>
            <Route
                path={`users/:userid/*`}
                element={
                    <GuardRoute meta={['organization_junta']}>
                        <UserFarmPage />
                    </GuardRoute>
                }
            />
        </Routes>
    )
}
