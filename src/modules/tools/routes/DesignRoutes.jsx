import { Route, Routes } from 'react-router-dom'
import { GuardRoute } from '../../../guards'
import { DesignOptionsPage } from '../pages'

export const DesignRoutes = () => {
    return (
        <>
            <Routes>
                <Route
                    index
                    element={
                        <GuardRoute meta={['design']}>
                            <DesignOptionsPage />
                        </GuardRoute>
                    }
                />
            </Routes>
        </>
    )
}
