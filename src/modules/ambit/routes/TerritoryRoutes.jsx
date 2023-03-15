import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { TerritoryNavPage, ZoneListPage, BlockListPage, LocationListPage } from '..'

export const TerritoryRoutes = () => {
    return (
        <Routes>
            <Route element={<TerritoryNavPage />} >
                <Route index element={<Navigate to={`zone`} replace />} />
                <Route
                    path={`zone`}
                    element={
                        <GuardRoute meta={['ambit_zones']}>
                            <ZoneListPage />
                        </GuardRoute>
                    }
                />
                <Route
                    path={`block`}
                    element={
                        <GuardRoute meta={['ambit_blocks']}>
                            <BlockListPage />
                        </GuardRoute>
                    }
                />
                <Route
                    path={`location`}
                    element={
                        <GuardRoute meta={['ambit_location']}>
                            <LocationListPage />
                        </GuardRoute>
                    }
                />
            </Route>
        </Routes>
    )
}
