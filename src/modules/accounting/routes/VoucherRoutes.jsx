import { Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { VoucherActivePage } from '../pages'

export const VoucherRoutes = () => {
    return (
        <Routes>
            {/* <Route index element={<GuardRoute meta={['voucher']} component={PettyCashListPage} />} /> */}
            <Route path={`/:voucherid`} element={<GuardRoute meta={['voucher']} component={VoucherActivePage} />} />
            {/* <Route path={`/comm/:commid`} element={<GuardRoute meta={['organization']} component={CommitteeActivePage} />} /> */}
        </Routes>
    )
}
