import { Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { TerritoryListPage } from '../pages'

export const TerritoryRoutes = () => {
    return (
        <Routes>
            <Route index element={<GuardRoute meta={['territory']} component={TerritoryListPage} />} />
            {/* <Route path={`/junta/:juntaid`} element={<GuardRoute meta={['organization']} component={JuntaActivePage} />} />
            <Route path={`/comm/:commid`} element={<GuardRoute meta={['organization']} component={CommitteeActivePage} />} /> */}
        </Routes>
    )
}
