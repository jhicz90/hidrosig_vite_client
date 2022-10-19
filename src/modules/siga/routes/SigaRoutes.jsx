import { Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { SigaHomePage, SigaReportPage } from '../pages'

export const SigaRoutes = () => {
    return (
        <Routes>
            <Route path={`resume`} element={<GuardRoute meta={['siga']} component={SigaHomePage} />} />
            <Route path={`report`} element={<GuardRoute meta={['siga']} component={SigaReportPage} />} />
        </Routes>
    )
}
