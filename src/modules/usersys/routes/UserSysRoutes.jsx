import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { GuardRoute } from '../../../guards/GuardRoute'
import { UserSysActivePage, UserSysCreatePage, UserSysListPage } from '../pages'

export const UserSysRoutes = () => {

    const { state } = useLocation()

    return (
        <>
            <Routes location={state?.background || location}>
                <Route path={`/`} element={<GuardRoute meta={['usersys']} component={UserSysListPage} />} />
                <Route path={`/:userid`} element={<GuardRoute meta={['usersys']} component={UserSysActivePage} />} />
                <Route path={`*`} element={<Navigate to={`./`} />} />
            </Routes>
            {state?.background && (
                <Routes>
                    <Route path={`/new/*`} element={<GuardRoute meta={['usersys']} component={UserSysCreatePage} />} />
                </Routes>
            )}
        </>
    )
}
