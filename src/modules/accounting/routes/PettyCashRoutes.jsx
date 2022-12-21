import { Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { EditVoucher } from '..'
import { PettyCashActivePage, PettyCashListPage } from '../pages'

export const PettyCashRoutes = () => {
    return (
        <Routes>
            <Route index element={<GuardRoute meta={['pettycash']} component={PettyCashListPage} />} />
            <Route path={`/:pettycashid`} element={<GuardRoute meta={['pettycash']} component={PettyCashActivePage} />} >
                <Route path={`edit/voucher/:voucherid`} element={<EditVoucher />} />
            </Route>
            {/* <Route path={`/comm/:commid`} element={<GuardRoute meta={['organization']} component={CommitteeActivePage} />} /> */}
        </Routes>
    )
}
