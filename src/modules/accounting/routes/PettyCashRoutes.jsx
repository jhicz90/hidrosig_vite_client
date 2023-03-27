import { Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { PettyCashListPage, PettyCashPage } from '../pages'

export const PettyCashRoutes = () => {
    return (
        <Routes>
            <Route
                index
                element={
                    <GuardRoute meta={['pettycash']} >
                        <PettyCashListPage />
                    </GuardRoute>
                }
            />
            <Route path={`:pettycashid/*`} element={<PettyCashPage />} />
        </Routes>
    )
}
