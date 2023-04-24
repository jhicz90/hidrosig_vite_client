import { Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { FeeCollectSearchPage } from '../pages'

export const FeeCollectRoutes = () => {
    return (
        <Routes>
            <Route
                index
                element={
                    <GuardRoute meta={['feecollect']} >
                        <FeeCollectSearchPage />
                    </GuardRoute>
                }
            />
            {/* <Route path={`create`} element={<PettyCashCreatePage />} /> */}
            {/* <Route path={`:pettycashid/*`} element={<PettyCashPage />} /> */}
        </Routes>
    )
}
