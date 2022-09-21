import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards/GuardRoute'
import { OccupationActivePage, OccupationListPage } from '../pages'

export const OccupationRoutes = () => {
    return (
        <>
            <Routes>
                <Route path={`/`} element={<GuardRoute meta={['occupation']} component={OccupationListPage} />} />
                <Route path={`/:occupid`} element={<GuardRoute meta={['occupation']} component={OccupationActivePage} />} />
                <Route path={`*`} element={<Navigate to={`./`} />} />
            </Routes>
        </>
    )
}
