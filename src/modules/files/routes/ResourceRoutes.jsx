import { Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { ResourcesPage } from '../pages'
import { DocumentBrowser, EditDocument } from '..'

export const ResourceRoutes = () => {
    return (
        <Routes>
            <Route path={`resources`} element={<GuardRoute meta={['resource']} component={ResourcesPage} />} >
                <Route path={`browser`} element={<>Explorador</>} />
                <Route path={`docs`} element={<DocumentBrowser />} >
                    <Route path={`edit/:docid`} element={<EditDocument />} />
                </Route>
            </Route>
        </Routes>
    )
}
