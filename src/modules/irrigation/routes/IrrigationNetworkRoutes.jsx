import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { IrrigationNetworkListPage } from '../pages'
import { EditSection, EditStructure, EditWaterSource, IrrigationNetworkChannel, VariableList, WaterSourceList } from '..'

export const IrrigationNetworkRoutes = () => {
    return (
        <Routes>
            <Route element={<IrrigationNetworkListPage />}>
                <Route index element={<Navigate to={`net`} />} />
                <Route
                    path={`net`}
                    element={
                        <GuardRoute meta={['irrigation_network']}>
                            <IrrigationNetworkChannel />
                        </GuardRoute>
                    }
                />
                <Route
                    path={`ws`}
                    element={
                        <GuardRoute meta={['watersource']}>
                            <WaterSourceList />
                        </GuardRoute>
                    }
                >
                    <Route path={`edit/:wsid`} element={<EditWaterSource />} />
                </Route>
                <Route
                    path={`var`}
                    element={
                        <GuardRoute meta={['irrigation_variables']}>
                            <VariableList />
                        </GuardRoute>
                    }
                />
            </Route>
        </Routes>
    )
}
