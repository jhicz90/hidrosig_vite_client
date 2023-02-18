import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { IrrigationNetworkListPage } from '../pages'
import { EditSection, EditStructure, EditWaterSource, IrrigationNetworkChannel, VariableList, WaterSourceList } from '..'

export const IrrigationNetworkRoutes = () => {
    return (
        <Routes>
            <Route path={`/`} element={<GuardRoute meta={['network']} component={IrrigationNetworkListPage} />} >
                <Route index element={<Navigate to={`net`} />} />
                <Route path={`net`} element={<IrrigationNetworkChannel />} >
                    <Route path={`edit/:strid`} element={<EditStructure />} >
                        <Route path={`sect/:secid`} element={<EditSection />} />
                    </Route>
                </Route>
                <Route path={`ws`} element={<WaterSourceList />} >
                    <Route path={`edit/:wsid`} element={<EditWaterSource />} />
                </Route>
                <Route path={`var`} element={<VariableList />}>

                </Route>
            </Route>
        </Routes>
    )
}
