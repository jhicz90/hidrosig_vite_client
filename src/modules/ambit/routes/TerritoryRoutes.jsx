import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { EditBlock, EditZone, ZoneList, TerritoryListPage, BlockList } from '..'

export const TerritoryRoutes = () => {
    return (
        <Routes>
            <Route element={<TerritoryListPage />} >
                <Route index element={<Navigate to={`zone`} />} />
                <Route
                    path={`zone`}
                    element={
                        <GuardRoute meta={['ambit_zones']}>
                            <ZoneList />
                        </GuardRoute>
                    }
                >
                    <Route path={`edit/:zoneid`} element={<EditZone />} />
                </Route>
                <Route
                    path={`block`}
                    element={
                        <GuardRoute meta={['ambit_blocks']}>
                            <BlockList />
                        </GuardRoute>
                    }
                >
                    <Route path={`edit/:blockid`} element={<EditBlock />} />
                </Route>
            </Route>
        </Routes>
    )
}
