import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { SystemPage } from '../pages'

export const SystemRoutes = () => {
    return (
        <>
            <Routes>
                <Route index element={<GuardRoute meta={['system']} component={SystemPage} />} />
                <Route path={`*`} element={<Navigate to={`./`} />} />
            </Routes>
        </>
    )
}
