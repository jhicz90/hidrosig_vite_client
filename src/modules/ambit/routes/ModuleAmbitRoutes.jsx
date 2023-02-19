import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { AmbitResumePage } from '../pages'
import { GeoObjectRoutes, OrganizationRoutes, TerritoryRoutes } from '..'

export const ModuleAmbitRoutes = () => {
    return (
        <Routes>
            <Route index element={<Navigate to={`resume`} />} />
            <Route path={`resume`} element={<AmbitResumePage />} />
            <Route
                path={`orgz/*`}
                element={
                    <GuardRoute meta={['ambit']}>
                        <OrganizationRoutes />
                    </GuardRoute>
                }
            />
            <Route
                path={`trrty/*`}
                element={
                    <GuardRoute meta={['ambit']}>
                        <TerritoryRoutes />
                    </GuardRoute>
                }
            />
            <Route
                path={`geoobj/*`}
                element={
                    <GuardRoute meta={['ambit']}>
                        <GeoObjectRoutes />
                    </GuardRoute>
                }
            />
        </Routes>
    )
}
