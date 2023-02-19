import { Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { MapGeographicPage } from '..'

export const GeoObjectRoutes = () => {
    return (
        <Routes>
            <Route
                index
                element={
                    <GuardRoute meta={['geographic_design']}>
                        <MapGeographicPage />
                    </GuardRoute>
                }
            />
        </Routes>
    )
}
