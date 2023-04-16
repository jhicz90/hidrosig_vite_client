import { useEffect } from 'react'
import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import { Card, Dropdown, Tab } from 'react-bootstrap'
import { IoEllipsisVertical, IoReturnUpBack } from 'react-icons/io5'
import { questionDeletePettycash, useDeletePettyCashByIdMutation, useGetPettyCashByIdQuery } from '../../../store/actions'
import { LoadingPage, SliderNavFlip } from '../../../components'
import { ExportExcelPettyCash, ExportPdfPettyCash, PettyCashBanner, PettyCashImages, PettyCashInformation, PettyCashListVouchers } from '../components'
import { useNavigateState } from '../../../hooks'

export const PettyCashPage = () => {

    const { pettycashid } = useParams()
    const [redirect, redirectEscape] = useNavigateState('/app/acct/petty_cash')

    const { data = null, isLoading, isError } = useGetPettyCashByIdQuery(pettycashid)
    const [deletePettyCash] = useDeletePettyCashByIdMutation()

    const handleDelete = async (id, name) => {
        if (await questionDeletePettycash(name)) {
            deletePettyCash(id)
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
                            <h4 className='mb-0'>CAJA CHICA</h4>
                        </div>
                        <div className='col-12 col-md-auto'>
                            <div className='d-flex gap-2'>
                                <Link
                                    to={`/app/acct/petty_cash`}
                                    className='btn btn-neutral-secondary'
                                >
                                    <IoReturnUpBack size={24} />
                                    LISTA CAJA CHICA
                                </Link>
                                <ExportExcelPettyCash />
                                <ExportPdfPettyCash />
                                <Dropdown className='dropdown-noarrow'>
                                    <Dropdown.Toggle variant='neutral' className='d-flex align-items-center'>
                                        <IoEllipsisVertical size={24} />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Reportes</Dropdown.Item>
                                        <Dropdown.Item>Imprimir</Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() => handleDelete(pettycashid, data?.name)}
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
                <div className='col-12 col-lg-5 col-xl-3'>
                    <PettyCashBanner />
                </div>
                <div className='col-12 col-lg-7 col-xl-9'>
                    <Tab.Container>
                        <Card className='p-2'>
                            <SliderNavFlip>
                                <NavLink to={``} end className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Información</NavLink>
                                <NavLink to={`img`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Images</NavLink>
                                <NavLink to={`vch`} className={({ isActive }) => isActive ? 'btn btn-neutral active' : 'btn btn-neutral'}>Comprobantes</NavLink>
                            </SliderNavFlip>
                        </Card>
                        <div className='mt-2'>
                            <Routes>
                                <Route index element={<PettyCashInformation />} />
                                <Route path={`img`} element={<PettyCashImages />} />
                                <Route path={`vch`} element={<PettyCashListVouchers />} />
                            </Routes>
                        </div>
                    </Tab.Container>
                </div>
            </div>
        </div>
    )
}
