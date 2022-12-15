import { Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { IrrigationNetworkListPage } from '../pages'
import { EditStructure, EditWaterSource } from '..'

export const IrrigationNetworkRoutes = () => {
    return (
        <Routes>
            <Route path={`/`} element={<GuardRoute meta={['network']} component={IrrigationNetworkListPage} />} >
                <Route path={`edit/structure/:strid`} element={<EditStructure />} />
                <Route path={`edit/watersource/:wsid`} element={<EditWaterSource />} />
            </Route>
        </Routes>
    )
}
