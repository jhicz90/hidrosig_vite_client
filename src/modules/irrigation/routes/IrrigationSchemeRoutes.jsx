import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { IrrigationSchemeResumePage } from '../pages'
import { IrrigationNetworkRoutes } from '..'

export const IrrigationSchemeRoutes = () => {
    return (
        <Routes>
            <Route index element={<Navigate to={`resume`} />} />
            <Route path={`resume`} element={<IrrigationSchemeResumePage />} />
            <Route path={`irrig/*`} element={<GuardRoute meta={['irrigschm']} component={IrrigationNetworkRoutes} />} />
            {/* <Route path={`sector/*`} element={<GuardRoute meta={['irrigschm']} component={TerritoryRoutes} />} /> */}
        </Routes>
    )
}
