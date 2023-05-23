import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { FeeCollectBillDebt } from '../pages'

export const GenCollectRoutes = () => {
    return (
        <Routes>
            <Route path={`:collect_prpid`} element={<FeeCollectBillDebt />} />
        </Routes>
    )
}
