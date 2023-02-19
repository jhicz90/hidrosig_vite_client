import { Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { EditVoucher } from '..'
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
            <Route path={`:pettycashid`} element={<PettyCashActivePage />} >
                <Route path={`edit/voucher/:voucherid`} element={<EditVoucher />} />
            </Route>
        </Routes>
    )
}
