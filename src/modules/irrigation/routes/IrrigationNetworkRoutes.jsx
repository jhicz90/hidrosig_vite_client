import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { IrrigationNetworkNavPage, StructureListPage, StructurePage } from '../pages'
import { ImportNetwork, ChannelSchemePage, VariableList, WaterSourceList } from '..'

export const IrrigationNetworkRoutes = () => {
    return (
        <Routes>
            <Route element={<IrrigationNetworkNavPage />}>
                <Route index element={<Navigate to={`net`} replace />} />
                <Route
                    path={`net`}
                    element={
                        <GuardRoute meta={['irrigation_network']}>
                            <ChannelSchemePage />
                        </GuardRoute>
                    }
                />
                <Route
                    path={`str`}
                    element={
                        <GuardRoute meta={['watersource']}>
                            <StructureListPage />
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
                />
                <Route
                    path={`var`}
                    element={
                        <GuardRoute meta={['irrigation_variables']}>
                            <VariableList />
                        </GuardRoute>
                    }
                />
                <Route
                    path={`import`}
                    element={
                        <GuardRoute meta={['import_network']}>
                            <ImportNetwork />
                        </GuardRoute>
                    }
                />
            </Route>
            <Route
                path={`str/:strid/*`}
                element={
                    <GuardRoute meta={['organization_junta']}>
                        <StructurePage />
                    </GuardRoute>
                }
            />
        </Routes>
    )
}
