import { Card, Tab } from 'react-bootstrap'
import validator from 'validator'
import { SliderNavFlip } from '../../../components'
import { NavLink, Navigate, Route, Routes, useSearchParams } from 'react-router-dom'
import { CollectCampaign, CollectManageVolume } from '..'

export const FeeCollectAreaFarmNavPage = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const { cmp, irr } = Object.fromEntries([...searchParams])
    const valid = validator.isMongoId(cmp || '') && validator.isMongoId(irr || '')

    return (
        valid
        &&
        <Tab.Container>
            <Card className='p-2'>
                <SliderNavFlip>
                    <NavLink to={`pay?cmp=${cmp}&irr=${irr}`} end className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Pago Tarifa</NavLink>
                    <NavLink to={`vol?cmp=${cmp}&irr=${irr}`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Volumen</NavLink>
                </SliderNavFlip>
            </Card>
            <div className='mt-2'>
                <Routes>
                    <Route index element={<Navigate to={`pay?cmp=${cmp}&irr=${irr}`} replace />} />
                    <Route path={`pay`} element={<CollectCampaign />} />
                    <Route path={`vol`} element={<CollectManageVolume />} />
                </Routes>
            </div>
        </Tab.Container>
    )
}
