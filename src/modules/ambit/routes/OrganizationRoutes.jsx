import { Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { CommitteeActivePage, JuntaActivePage, OrganizationListPage } from '../pages'

export const OrganizationRoutes = () => {
    return (
        <Routes>
            <Route index element={<GuardRoute meta={['organization']} component={OrganizationListPage} />} />
            <Route path={`/junta/:juntaid`} element={<GuardRoute meta={['organization']} component={JuntaActivePage} />} />
            <Route path={`/comm/:commid`} element={<GuardRoute meta={['organization']} component={CommitteeActivePage} />} />
        </Routes>
    )
}
