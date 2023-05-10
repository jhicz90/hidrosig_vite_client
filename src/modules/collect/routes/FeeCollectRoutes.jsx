import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { FeeCollectBillAreaFarmPage, FeeCollectBillUserFarmPage, FeeCollectNavPage, FeeCollectSearchPage } from '../pages'

export const FeeCollectRoutes = () => {
    return (
        <Routes>
            <Route element={<FeeCollectNavPage />}>
                <Route index element={<Navigate to={`search`} replace />} />
                <Route
                    path={`search`}
                    element={
                        <GuardRoute meta={['feecollect']} >
                            <FeeCollectSearchPage />
                        </GuardRoute>
                    }
                />
                <Route path={`usr/:userid/*`} element={<FeeCollectBillUserFarmPage />} />
                <Route path={`prp/:prpid`} element={<FeeCollectBillAreaFarmPage />} />
                {/* <Route path={`create`} element={<PettyCashCreatePage />} /> */}
                {/* <Route path={`:pettycashid/*`} element={<PettyCashPage />} /> */}
            </Route>
        </Routes>
    )
}
