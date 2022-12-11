import { Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { UserSysActivePage, UserSysListPage } from '../pages'

export const UserSysRoutes = () => {
    return (
        <Routes>
            <Route index element={<GuardRoute meta={['usersys']} component={UserSysListPage} />} />
            <Route path={`/:userid`} element={<GuardRoute meta={['usersys']} component={UserSysActivePage} />} />
        </Routes>
    )
}
