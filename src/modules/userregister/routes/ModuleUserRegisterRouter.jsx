import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { UserAndFarmRoutes } from '..'

export const ModuleUserRegisterRouter = () => {
    return (
        <Routes>
            <Route index element={<Navigate to={`resume`} replace />} />
            <Route path={`resume`} element={<>Resumen de Padrón de usuarios</>} />
            <Route
                path={`user_farm/*`}
                element={
                    <GuardRoute meta={['userregister']}>
                        <UserAndFarmRoutes />
                    </GuardRoute>
                }
            />
        </Routes>
    )
}
