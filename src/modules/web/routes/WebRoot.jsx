import { Route, Routes, useLocation } from 'react-router-dom'

import { Layout } from '../layout'
import { AboutPage, HomePage, ServicesPage } from '../pages'

export const WebRoot = () => {

    const location = useLocation()
    const { state } = location

    return (
        <Routes location={state?.backgroundLocation || location}>
            <Route path={`/`} element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path={`servs`} element={<ServicesPage />} />
                <Route path={`about`} element={<AboutPage />} />
            </Route>
        </Routes>
    )
}