import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { SigaHomePage } from '../pages'
import { SigaReportRoutes } from '..'

export const ModuleSigaRoutes = () => {
    return (
        <Routes>
            <Route index element={<Navigate to={`resume`} />} />
            <Route path={`resume`} element={<SigaHomePage />} />
            <Route
                path={`report`}
                element={
                    <GuardRoute meta={['siga']}>
                        <SigaReportRoutes />
                    </GuardRoute>
                }
            />
        </Routes>
    )
}
