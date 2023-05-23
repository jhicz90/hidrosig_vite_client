import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { FeeCollectRoutes, GenCollectRoutes } from '..'

export const ModuleCollectRoutes = () => {
    return (
        <Routes>
            <Route index element={<Navigate to={`resume`} />} />
            <Route path={`resume`} element={<>Resumen de cobranza</>} />
            <Route
                path={`bill/*`}
                element={
                    <GuardRoute meta={['collect']}>
                        <FeeCollectRoutes />
                    </GuardRoute>
                }
            />
            <Route
                path={`cllc/*`}
                element={
                    <GuardRoute meta={['collect']}>
                        <GenCollectRoutes />
                    </GuardRoute>
                }
            />
        </Routes>
    )
}
