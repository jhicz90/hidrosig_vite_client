import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { UserFarmRoutes } from '..'

export const ModuleUserRegisterRouter = () => {
    return (
        <Routes>
            <Route index element={<Navigate to={`resume`} />} />
            <Route path={`resume`} element={<>Resumen de Padrón de usuarios</>} />
            <Route
                path={`user_farm/*`}
                element={
                    <GuardRoute meta={['userregister']}>
                        <UserFarmRoutes />
                    </GuardRoute>
                }
            />
        </Routes>
    )
}
