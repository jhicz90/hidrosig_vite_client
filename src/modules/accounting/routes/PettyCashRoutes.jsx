import { Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { PettyCashActivePage, PettyCashListPage } from '../pages'

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
            <Route path={`:pettycashid`} element={<PettyCashActivePage />} />
        </Routes>
    )
}
