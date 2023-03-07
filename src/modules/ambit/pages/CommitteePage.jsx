import { NavLink, Route, Routes, useParams } from 'react-router-dom'
import { AiFillNotification } from 'react-icons/ai'
import { IoEllipsisVertical } from 'react-icons/io5'
import { Button, Card, Dropdown, Nav, Tab } from 'react-bootstrap'
import { useDeleteCommByIdMutation, useGetCommByIdQuery, useUpdateCommByIdMutation } from '../../../store/actions'
import { LoadingPage } from '../../../components'
import { CommitteeInformation } from '../components'
import { useNavigateState } from '../../../hooks'

export const CommitteePage = () => {

    const { commid } = useParams()
    const [state, redirect, redirectEscape] = useNavigateState('/app/ambit/orgz/comm')

    const { data = null, isLoading, isError } = useGetCommByIdQuery(commid)
    const [updateComm, { isLoading: isSaving }] = useUpdateCommByIdMutation()
    const [deleteComm] = useDeleteCommByIdMutation()

    if (isLoading) {
        return <LoadingPage />
    }

    if (isError) {
        redirectEscape()
    }

    return (
        <>
            {
                !!data
                &&
                <div className='container'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='row align-items-center justify-content-between g-3 mb-3'>
                                <div className='col-12 col-md-auto'>
                                    <h4 className='mb-0'>Detalles de Comisión</h4>
                                </div>
                                <div className='col-12 col-md-auto'>
                                    <div className='d-flex gap-2'>
                                        <Button variant='primary' className='d-flex align-items-center gap-2'>
                                            <AiFillNotification size={24} />
                                            Enviar notificación
                                        </Button>
                                        <Button
                                            // onClick={handleActiveStatus}
                                            disabled={isSaving || isLoading}
                                            variant={data.status ? 'danger' : 'success'}
                                        >
                                            {data.status ? 'Desactivar' : 'Activar'}
                                        </Button>
                                        <Dropdown className='dropdown-noarrow'>
                                            <Dropdown.Toggle variant='neutral' className='d-flex align-items-center'>
                                                <IoEllipsisVertical size={24} />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item>Reportes</Dropdown.Item>
                                                <Dropdown.Item>Imprimir</Dropdown.Item>
                                                <Dropdown.Item
                                                    onClick={() => handleDelete(juntaid, data?.name)}
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
                        <div className='col-md-5 col-lg-5 col-xl-4'>
                            {/* <JuntaBanner /> */}
                        </div>
                        <div className='col-md-7 col-lg-7 col-xl-8'>
                            <Tab.Container>
                                <Card className='p-2'>
                                    <Nav variant='pills'>
                                        <Nav.Item>
                                            <NavLink to={``} end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Información</NavLink>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <NavLink to={`ambit`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Ámbito</NavLink>
                                        </Nav.Item>
                                    </Nav>
                                </Card>
                                <div className='mt-2'>
                                    <Routes>
                                        <Route index element={<CommitteeInformation />} />
                                        {/* <Route path={`ambit`} element={<CommitteeAmbit />} /> */}
                                    </Routes>
                                </div>
                            </Tab.Container>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}