import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { FeeCollectAreaFarmNavPage, FeeCollectBillAreaFarmPage, FeeCollectBillUserFarmPage, FeeCollectSearchPage } from '../pages'

export const FeeCollectRoutes = () => {
    return (
        <Routes>
            <Route index element={<Navigate to={`search`} replace />} />
            <Route path={`search`} element={<FeeCollectSearchPage />} />
            <Route path={`usr/:usrid`} element={<FeeCollectBillUserFarmPage />} />
            <Route path={`usr/:usrid/:prpid/*`} element={<FeeCollectBillAreaFarmPage />} />
            <Route path={`prp/:prpid/*`} element={<FeeCollectBillAreaFarmPage />} />
        </Routes>
    )
}
