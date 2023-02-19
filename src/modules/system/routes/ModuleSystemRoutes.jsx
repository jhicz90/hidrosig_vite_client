import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { SystemResumePage } from '../pages'
import { OccupationRoutes, RoleRoutes, SettingRoutes, UserSysRoutes } from '.'

export const ModuleSystemRoutes = () => {
    return (
        <Routes>
            <Route index element={<Navigate to={`resume`} />} />
            <Route path={`resume`} element={<SystemResumePage />} />
            <Route
                path={`user_sys/*`}
                element={
                    <GuardRoute meta={['system_configuration']}>
                        <UserSysRoutes />
                    </GuardRoute>
                }
            />
            <Route
                path={`occup/*`}
                element={
                    <GuardRoute meta={['system_configuration']}>
                        <OccupationRoutes />
                    </GuardRoute>
                }
            />
            <Route
                path={`role/*`}
                element={
                    <GuardRoute meta={['system_configuration']}>
                        <RoleRoutes />
                    </GuardRoute>
                }
            />
            <Route
                path={`settings/*`}
                element={
                    <GuardRoute meta={['system_configuration']}>
                        <SettingRoutes />
                    </GuardRoute>
                }
            />
        </Routes>
    )
}