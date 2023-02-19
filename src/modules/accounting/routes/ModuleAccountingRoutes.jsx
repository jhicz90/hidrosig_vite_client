import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { PettyCashRoutes } from '..'

export const ModuleAccountingRoutes = () => {
    return (
        <Routes>
            <Route index element={<Navigate to={`resume`} />} />
            <Route path={`resume`} element={<>Resumen de contabilidad</>} />
            <Route
                path={`petty_cash/*`}
                element={
                    <GuardRoute meta={['accounting']}>
                        <PettyCashRoutes />
                    </GuardRoute>
                }
            />
        </Routes>
    )
}
