import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { PettyCashRoutes, VoucherRoutes } from '..'

export const ModuleAccountingRoutes = () => {
    return (
        <Routes>
            <Route index element={<Navigate to={`resume`} replace />} />
            <Route path={`resume`} element={<>Resumen de contabilidad</>} />
            <Route
                path={`petty_cash/*`}
                element={
                    <GuardRoute meta={['accounting']}>
                        <PettyCashRoutes />
                    </GuardRoute>
                }
            />
            <Route
                path={`voucher/*`}
                element={
                    <GuardRoute meta={['accounting']}>
                        <VoucherRoutes />
                    </GuardRoute>
                }
            />
        </Routes>
    )
}
