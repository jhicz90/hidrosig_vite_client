import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { CommitteePage, JuntaPage, OrganizationNavPage, JuntaListPage, CommitteeListPage, JuntaCreatePage, CommitteeCreatePage } from '..'

export const OrganizationRoutes = () => {
    return (
        <Routes>
            <Route element={<OrganizationNavPage />}>
                <Route index element={<Navigate to={`junta`} replace />} />
                <Route
                    path={`junta`}
                    element={
                        <GuardRoute meta={['organization_junta']}>
                            <JuntaListPage />
                        </GuardRoute>
                    }
                />
                <Route
                    path={`comm`}
                    element={
                        <GuardRoute meta={['organization_comm']}>
                            <CommitteeListPage />
                        </GuardRoute>
                    }
                />
            </Route>
            <Route
                path={`junta/create`}
                element={<JuntaCreatePage />}
            />
            <Route
                path={`junta/:juntaid/*`}
                element={
                    <GuardRoute meta={['organization_junta']}>
                        <JuntaPage />
                    </GuardRoute>
                }
            />
            <Route
                path={`comm/create`}
                element={<CommitteeCreatePage />}
            />
            <Route
                path={`comm/:commid/*`}
                element={
                    <GuardRoute meta={['organization_comm']}>
                        <CommitteePage />
                    </GuardRoute>
                }
            />
        </Routes>
    )
}
