import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { RoleActivePage, RoleListPage } from '../pages'

export const RoleRoutes = () => {
    return (
        <Routes>
            <Route
                index
                element={
                    <GuardRoute meta={['role']}>
                        <RoleListPage />
                    </GuardRoute>
                }
            />
            <Route
                path={`/:roleid`}
                element={
                    <GuardRoute meta={['role']}>
                        <RoleActivePage />
                    </GuardRoute>
                }
            />
        </Routes>
    )
}
