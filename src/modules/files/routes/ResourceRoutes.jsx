import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { ResourcesPage } from '../pages'
import { DocumentBrowser, EditDocument } from '..'

export const ResourceRoutes = () => {
    return (
        <Routes>
            <Route element={<ResourcesPage />}>
                <Route index element={<Navigate to={`browser`} />} />
                <Route
                    path={`browser`}
                    element={
                        <GuardRoute meta={['file_browser']}>
                            <>Explorador de archivos</>
                        </GuardRoute>
                    }
                />
                <Route
                    path={`docs`}
                    element={
                        <GuardRoute meta={['documents']}>
                            <DocumentBrowser />
                        </GuardRoute>
                    }
                >
                    <Route path={`edit/:docid`} element={<EditDocument />} />
                </Route>
            </Route>
        </Routes>
    )
}
