import { Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { SigaReportPage } from '../pages'

export const SigaReportRoutes = () => {
    return (
        <Routes>
            <Route
                index
                element={
                    <GuardRoute meta={['siga_report']}>
                        <SigaReportPage />
                    </GuardRoute>
                }
            />
        </Routes>
    )
}
