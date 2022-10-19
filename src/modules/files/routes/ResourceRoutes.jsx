import { Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { ResourcesPage } from '../pages'

export const ResourceRoutes = () => {
    return (
        <Routes>
            <Route path={`resources`} element={<GuardRoute meta={['resource']} component={ResourcesPage} />} />
        </Routes>
    )
}
