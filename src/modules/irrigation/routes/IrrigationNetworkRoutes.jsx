import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { ChannelSchemePage, ImportNetworkPage, IrrigationNetworkNavPage, SectionCreatePage, SectionPage, StructureCreatePage, StructureListPage, StructurePage, VariableListPage, WaterSourceCreatePage, WaterSourceListPage, WaterSourcePage } from '../pages'

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
                            <WaterSourceListPage />
                        </GuardRoute>
                    }
                />
                <Route
                    path={`var`}
                    element={
                        <GuardRoute meta={['irrigation_variables']}>
                            <VariableListPage />
                        </GuardRoute>
                    }
                />
                <Route
                    path={`import`}
                    element={
                        <GuardRoute meta={['import_network']}>
                            <ImportNetworkPage />
                        </GuardRoute>
                    }
                />
            </Route>
            <Route
                path={`str/create`}
                element={
                    <GuardRoute meta={['organization_junta']}>
                        <StructureCreatePage />
                    </GuardRoute>
                }
            />
            <Route
                path={`str/:strid/*`}
                element={
                    <GuardRoute meta={['organization_junta']}>
                        <StructurePage />
                    </GuardRoute>
                }
            />
            <Route
                path={`ws/create`}
                element={
                    <GuardRoute meta={['organization_junta']}>
                        <WaterSourceCreatePage />
                    </GuardRoute>
                }
            />
            <Route
                path='ws/:wsid/*'
                element={
                    <GuardRoute meta={['organization_junta']}>
                        <WaterSourcePage />
                    </GuardRoute>
                }
            />
             <Route
                path='sct/create'
                element={
                    <GuardRoute meta={['organization_junta']}>
                        <SectionCreatePage />
                    </GuardRoute>
                }
            />
            <Route
                path='sct/:sectid/*'
                element={
                    <GuardRoute meta={['organization_junta']}>
                        <SectionPage />
                    </GuardRoute>
                }
            />
        </Routes>
    )
}
