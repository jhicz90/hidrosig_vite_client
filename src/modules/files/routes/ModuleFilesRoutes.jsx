import { Navigate, Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { ResourceRoutes } from '..'

export const ModuleFilesRoutes = () => {
    return (
        <Routes>
            <Route index element={<Navigate to={`resume`} />} />
            <Route path={`resume`} element={<>Resumen de archivos</>} />
            <Route
                path={`res/*`}
                element={
                    <GuardRoute meta={['file_manager']}>
                        <ResourceRoutes />
                    </GuardRoute>
                }
            />
        </Routes>
    )
}
