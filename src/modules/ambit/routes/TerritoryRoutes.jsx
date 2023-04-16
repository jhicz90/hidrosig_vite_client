import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { TerritoryNavPage, ZoneListPage, BlockListPage, LocationListPage, ZoneCreatePage, BlockCreatePage, ZonePage, BlockPage } from '..'

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
            <Route
                path={`zone/create`}
                element={<ZoneCreatePage />}
            />
            <Route
                path={`zone/:znid/*`}
                element={<ZonePage />}
            />
            <Route
                path={`block/create`}
                element={<BlockCreatePage />}
            />
            <Route
                path={`block/:blkid/*`}
                element={<BlockPage />}
            />
        </Routes>
    )
}
