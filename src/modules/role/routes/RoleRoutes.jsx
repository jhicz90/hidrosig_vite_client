import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards/GuardRoute'
import { RoleActivePage, RoleListPage } from '../pages'

export const RoleRoutes = () => {
    return (
        <>
            <Routes>
                <Route path={`/`} element={<GuardRoute meta={['role']} component={RoleListPage} />} />
                <Route path={`/:roleid`} element={<GuardRoute meta={['role']} component={RoleActivePage} />} />
                <Route path={`*`} element={<Navigate to={`./`} />} />
            </Routes>
        </>
    )
}
