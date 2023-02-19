import { Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { OccupationActivePage, OccupationListPage } from '../pages'

export const OccupationRoutes = () => {
    return (
        <Routes>
            <Route
                index
                element={
                    <GuardRoute meta={['occupation']}>
                        <OccupationListPage />
                    </GuardRoute>
                }
            />
            <Route
                path={`/:occupid`}
                element={
                    <GuardRoute meta={['occupation']}>
                        <OccupationActivePage />
                    </GuardRoute>
                }
            />
        </Routes>
    )
}
