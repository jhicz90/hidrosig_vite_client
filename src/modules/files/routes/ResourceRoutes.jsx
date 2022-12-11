import { Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { ResourcesPage } from '../pages'
import { EditDocument } from '..'

export const ResourceRoutes = () => {
    return (
        <Routes>
            <Route path={`resources`} element={<GuardRoute meta={['resource']} component={ResourcesPage} />} >
                <Route path={`edit/doc/:docid`} element={<EditDocument />} />
            </Route>
        </Routes>
    )
}
