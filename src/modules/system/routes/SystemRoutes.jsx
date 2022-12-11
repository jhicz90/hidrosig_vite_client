import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { SystemResumePage } from '../pages'
import { OccupationRoutes, RoleRoutes, SettingRoutes, UserSysRoutes } from './'

export const SystemRoutes = () => {
    return (
        <Routes>
            <Route index element={<Navigate to={`resume`} />} />
            <Route path={`resume`} element={<SystemResumePage />} />
            <Route path={`user_sys/*`} element={<GuardRoute meta={['system']} component={UserSysRoutes} />} />
            <Route path={`occup/*`} element={<GuardRoute meta={['system']} component={OccupationRoutes} />} />
            <Route path={`role/*`} element={<GuardRoute meta={['system']} component={RoleRoutes} />} />
            <Route path={`settings/*`} element={<GuardRoute meta={['system']} component={SettingRoutes} />} />
        </Routes>
    )
}