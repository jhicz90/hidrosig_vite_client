import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { ChannelNetworkPage, ImportNetworkPage, IrrigationNetworkNavPage, SectionCreatePage, SectionPage, ChannelCreatePage, ChannelListPage, ChannelPage, VariableListPage, WaterSourceCreatePage, WaterSourceListPage, WaterSourcePage } from '../pages'

export const IrrigationNetworkRoutes = () => {
    return (
        <Routes>
            <Route element={<IrrigationNetworkNavPage />}>
                <Route index element={<Navigate to={`net`} replace />} />
                <Route
                    path={`net`}
                    element={
                        <GuardRoute meta={['irrigation_network']}>
                            <ChannelNetworkPage />
                        </GuardRoute>
                    }
                />
                <Route
                    path={`chn`}
                    element={
                        <GuardRoute meta={['watersource']}>
                            <ChannelListPage />
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
                path={`chn/create`}
                element={
                    <GuardRoute meta={['organization_junta']}>
                        <ChannelCreatePage />
                    </GuardRoute>
                }
            />
            <Route
                path={`chn/:strid/*`}
                element={
                    <GuardRoute meta={['organization_junta']}>
                        <ChannelPage />
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
