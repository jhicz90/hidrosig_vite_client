import { Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { IrrigationNetworkListPage } from '../pages'

export const IrrigationNetworkRoutes = () => {
    return (
        <Routes>
            <Route index element={<GuardRoute meta={['territory']} component={IrrigationNetworkListPage} />} />
            {/* <Route path={`/junta/:juntaid`} element={<GuardRoute meta={['organization']} component={JuntaActivePage} />} />
            <Route path={`/comm/:commid`} element={<GuardRoute meta={['organization']} component={CommitteeActivePage} />} /> */}
        </Routes>
    )
}
