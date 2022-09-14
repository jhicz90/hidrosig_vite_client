import { Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards/GuardRoute'
import { UserSysListPage } from '../pages'

export const UserSysRoutes = () => {
    return (
        <Routes>
            <Route path={`/`} element={<GuardRoute meta={['usersys']} component={UserSysListPage} />} />
            {/* <Route path={`/:id`} element={<GuardRoute meta={['usersys']} component={UserSysEditPage} />} /> */}
        </Routes>
    )
}
