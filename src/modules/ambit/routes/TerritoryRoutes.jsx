import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { EditBlock, EditZone, ZoneList, TerritoryListPage, BlockList } from '..'

export const TerritoryRoutes = () => {
    return (
        <Routes>
            <Route path={`/`} element={<GuardRoute meta={['territory']} component={TerritoryListPage} />} >
                <Route index element={<Navigate to={`zone`} />} />
                <Route path={`zone`} element={<ZoneList />} >
                    <Route path={`edit/:zoneid`} element={<EditZone />} />
                </Route>
                <Route path={`block`} element={<BlockList />} >
                    <Route path={`edit/:blockid`} element={<EditBlock />} />
                </Route>
            </Route>
        </Routes>
    )
}
