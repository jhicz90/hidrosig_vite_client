import { Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { MapGeographicPage } from '..'

export const GeoObjectRoutes = () => {
    return (
        <Routes>
            <Route path={`/`} element={<GuardRoute meta={['geographic']} component={MapGeographicPage} />} />
        </Routes>
    )
}
