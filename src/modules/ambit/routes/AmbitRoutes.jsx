import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { AmbitResumePage } from '../pages'
import { GeoObjectRoutes, OrganizationRoutes, TerritoryRoutes } from '..'

export const AmbitRoutes = () => {
    return (
        <Routes>
            <Route index element={<Navigate to={`resume`} />} />
            <Route path={`resume`} element={<AmbitResumePage />} />
            <Route path={`orgz/*`} element={<GuardRoute meta={['ambit']} component={OrganizationRoutes} />} />
            <Route path={`trrty/*`} element={<GuardRoute meta={['ambit']} component={TerritoryRoutes} />} />
            <Route path={`geoobj/*`} element={<GuardRoute meta={['ambit']} component={GeoObjectRoutes} />} />
        </Routes>
    )
}
