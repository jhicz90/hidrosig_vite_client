import { useEffect } from 'react'
import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import { Card, Dropdown, Tab } from 'react-bootstrap'
import { IoEllipsisVertical, IoReturnUpBack } from 'react-icons/io5'
import { useNavigateState } from '../../../hooks'
import { YearRateBanner, YearRateValueRates, YearRateInformation } from '../components'
import { LoadingPage, SliderNavFlip } from '../../../components'
import { questionDeleteYearRate, useDeleteYearRateByIdMutation, useGetYearRateByIdQuery } from '../../../store/actions'

export const YearRatePage = () => {

    const { yrtid } = useParams()
    const [redirect, redirectEscape] = useNavigateState('/app/ambit/orgz/junta')

    const { data = null, isLoading, isError } = useGetYearRateByIdQuery(yrtid)
    const [deleteYearRate] = useDeleteYearRateByIdMutation()

    const handleDelete = async (id, yearrate) => {
        if (await questionDeleteYearRate(yearrate)) {
            deleteYearRate(id).unwrap().then(() => {
                redirect()
            })
        }
    }

    useEffect(() => {
        if (isError) {
            redirectEscape()
        }
    }, [isError])

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        !!data
        &&
        <div className='container-fluid'>
            <div className='row my-3'>
                <div className='col-12'>
                    <div className='row align-items-center justify-content-between g-3'>
                        <div className='col-12 col-md-auto'>
                            <h4 className='mb-0'>AÑO - CAMPAÑA</h4>
                        </div>
                        <div className='col-12 col-md-auto'>
                            <div className='d-flex gap-2'>
                                <Link
                                    to={`/app/ambit/orgz/junta/${data.junta._id}/yr`}
                                    className='btn btn-neutral-secondary'
                                >
                                    <IoReturnUpBack size={24} />
                                    {data.junta.name}
                                </Link>
                                <Dropdown className='dropdown-noarrow'>
                                    <Dropdown.Toggle variant='neutral' className='d-flex align-items-center'>
                                        <IoEllipsisVertical size={24} />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Reportes</Dropdown.Item>
                                        <Dropdown.Item>Imprimir</Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() => handleDelete(yrtid, data)}
                                            className='text-danger'
                                        >
                                            Eliminar
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <YearRateBanner />
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <Tab.Container>
                        <Card className='p-2'>
                            <SliderNavFlip>
                                <NavLink to={``} end className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Información</NavLink>
                                <NavLink to={`vl`} end className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Valores de tarifa</NavLink>
                            </SliderNavFlip>
                        </Card>
                        <div className='mt-2'>
                            <Routes>
                                <Route index element={<YearRateInformation />} />
                                <Route path={`vl`} element={<YearRateValueRates />} />
                            </Routes>
                        </div>
                    </Tab.Container>
                </div>
            </div>
        </div>
    )
}
