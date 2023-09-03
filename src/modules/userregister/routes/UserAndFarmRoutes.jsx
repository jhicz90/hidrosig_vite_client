import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { UserAndFarmNavPage, UserFarmImportPage, UserFarmPage, UserFarmListPage, AreaFarmListPage, AreaFarmPage, UserFarmCreatePage, AreaFarmCreatePage } from '..'

export const UserAndFarmRoutes = () => {
    return (
        <Routes>
            <Route element={<UserAndFarmNavPage />}>
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
                path={`users/create`}
                element={<UserFarmCreatePage />}
            />
            <Route
                path={`users/:userid/*`}
                element={
                    <GuardRoute meta={['organization_junta']}>
                        <UserFarmPage />
                    </GuardRoute>
                }
            />
            <Route
                path={`prps/create`}
                element={<AreaFarmCreatePage />}
            />
            <Route
                path={`prps/:prpid/*`}
                element={
                    <GuardRoute meta={['organization_junta']}>
                        <AreaFarmPage />
                    </GuardRoute>
                }
            />
        </Routes>
    )
}
