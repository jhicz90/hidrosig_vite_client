import { Route, Routes } from 'react-router-dom'
import { EditBlock, EditZone } from '..'
import { GuardRoute } from '../../../guards'
import { TerritoryListPage } from '../pages'

export const TerritoryRoutes = () => {
    return (
        <Routes>
            <Route path={`/`} element={<GuardRoute meta={['territory']} component={TerritoryListPage} />} >
                <Route path={`edit/zone/:zoneid`} element={<EditZone />} />
                <Route path={`edit/block/:blockid`} element={<EditBlock />} />
            </Route>
        </Routes>
    )
}
