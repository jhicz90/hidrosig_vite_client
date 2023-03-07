import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { CommitteePage, JuntaPage, OrganizationListPage, JuntaList, CommitteeList } from '..'

export const OrganizationRoutes = () => {
    return (
        <Routes>
            <Route element={<OrganizationListPage />}>
                <Route index element={<Navigate to={`junta`} />} />
                <Route
                    path={`junta`}
                    element={
                        <GuardRoute meta={['organization_junta']}>
                            <JuntaList />
                        </GuardRoute>
                    }
                />
                <Route
                    path={`comm`}
                    element={
                        <GuardRoute meta={['organization_comm']}>
                            <CommitteeList />
                        </GuardRoute>
                    }
                />
            </Route>
            <Route
                path={`junta/:juntaid/*`}
                element={
                    <GuardRoute meta={['organization_junta']}>
                        <JuntaPage />
                    </GuardRoute>
                }
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
