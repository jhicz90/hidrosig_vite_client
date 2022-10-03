import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards/GuardRoute'
import { SigaHomePage, SigaReportPage } from '../pages'

export const SigaRoutes = () => {
    return (
        <Routes>
            <Route index element={<GuardRoute meta={['siga']} component={SigaHomePage} />} />
            <Route path={`report`} element={<GuardRoute meta={['siga']} component={SigaReportPage} />} />
            <Route path={`*`} element={<Navigate to={`./`} />} />
        </Routes>
    )
}
