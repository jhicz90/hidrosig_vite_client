import { Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { SettingsPage } from '../pages'

export const SettingRoutes = () => {
    return (
        <Routes>
            <Route index element={<GuardRoute meta={['system']} component={SettingsPage} />} />
        </Routes>
    )
}
