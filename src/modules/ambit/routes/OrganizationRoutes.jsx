import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { CommitteeActivePage, JuntaActivePage, OrganizationListPage, JuntaList, CommitteeList } from '..'

export const OrganizationRoutes = () => {
    return (
        <Routes>
            <Route path={`/`} element={<GuardRoute meta={['organization']} component={OrganizationListPage} />} >
                <Route index element={<Navigate to={`junta`} />} />
                <Route path={`junta`} element={<JuntaList />} />
                <Route path={`comm`} element={<CommitteeList />} />
            </Route>
            <Route path={`junta/:juntaid`} element={<JuntaActivePage />} />
            <Route path={`comm/:commid`} element={<CommitteeActivePage />} />
        </Routes>
    )
}
