import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { FeeCollectBillAreaFarmPage, FeeCollectBillUserFarmPage, FeeCollectNavPage, FeeCollectSearchPage } from '../pages'

export const FeeCollectRoutes = () => {
    return (
        <Routes>
            <Route index element={<FeeCollectNavPage />} />
        </Routes>
    )
}
