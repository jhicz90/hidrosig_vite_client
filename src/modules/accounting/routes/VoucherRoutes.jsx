import { Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { VoucherPage, VoucherCreatePage } from '../pages'

export const VoucherRoutes = () => {
    return (
        <Routes>
            {/* <Route index element={<GuardRoute meta={['voucher']} component={PettyCashListPage} />} /> */}
            <Route path={`create`} element={<VoucherCreatePage />} />
            <Route path={`/:voucherid/*`} element={<VoucherPage />} />
        </Routes>
    )
}
