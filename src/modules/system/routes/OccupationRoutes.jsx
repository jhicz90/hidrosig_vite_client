import { Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { OccupationActivePage, OccupationListPage } from '../pages'

export const OccupationRoutes = () => {
    return (
        <Routes>
            <Route path={`/`} element={<GuardRoute meta={['occupation']} component={OccupationListPage} />} />
            <Route path={`/:occupid`} element={<GuardRoute meta={['occupation']} component={OccupationActivePage} />} />
        </Routes>
    )
}
