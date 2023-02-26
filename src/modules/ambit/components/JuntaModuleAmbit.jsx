import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { ButtonGroup, Card, ListGroup } from 'react-bootstrap'
import { IoMdEye } from 'react-icons/io'
import { useGetListCommByJuntaQuery, useGetListWaterSourceByJuntaQuery, useGetListZoneByJuntaQuery } from '../../../store/actions'
import { Avatar, InputSearch, LinkBack, SettingAction, SettingBlock, TableGrid, TagStatus, TypeWaterSource } from '../../../components'
import { CreateZone, CreateCommittee } from '.'

export const JuntaModuleAmbit = () => {
    return (
        <>
            <div className='row row-cols-1 g-4'>
                <div className='col'>
                    <Card>
                        <ListGroup variant='flush'>
                            <JuntaZone />
                        </ListGroup>
                    </Card>
                </div>
                <div className='col'>
                    <Card>
                        <ListGroup variant='flush'>
                            <JuntaWaterSource />
                        </ListGroup>
                    </Card>
                </div>
                <div className='col'>
                    <Card>
                        <ListGroup variant='flush'>
                            <JuntaCommittee />
                        </ListGroup>
                    </Card>
                </div>
            </div>
        </>
    )
}

const JuntaZone = () => {

    const [search, setSearch] = useState('')
    const { active } = useSelector(state => state.junta)
    const { data: zonesIn = [], isLoading } = useGetListZoneByJuntaQuery({ junta: active._id, search }, { refetchOnMountOrArgChange: true })

    return (
        <SettingBlock
            title='Zonas'
            loading={isLoading}
            action={
                <SettingAction>
                    <CreateZone junta={active} />
                </SettingAction>
            }
            list={
                <>
                    <InputSearch className='my-3 px-3' value={search} onChange={(e) => setSearch(e)} loading={isLoading} />
                    <TableGrid
                        style={{
                            height: '200px'
                        }}
                        rows={zonesIn}
                        columns={
                            [
                                {
                                    label: 'ZONA',
                                    resize: true,
                                    renderCell: (item) => (
                                        item.name
                                    )
                                },
                                {
                                    label: 'JUNTA',
                                    renderCell: (item) => (
                                        <span>{item.junta?.name || 'Sin junta de usuarios'}</span>
                                    )
                                },
                                {
                                    label: 'ORDEN',
                                    renderCell: (item) =>
                                        item.order
                                },
                                {
                                    label: 'ACCIÓN',
                                    pinRight: true,
                                    renderCell: (item) =>
                                        <ButtonGroup>
                                            <LinkBack
                                                className='btn btn-neutral'
                                                to={`?w=zone_edit&id=${item._id}`}
                                            >
                                                <FaPen />
                                            </LinkBack>
                                        </ButtonGroup>
                                }
                            ]
                        }
                    />
                </>
            }
        />
    )
}

const JuntaWaterSource = () => {

    const location = useLocation()
    const [search, setSearch] = useState('')
    const { active } = useSelector(state => state.junta)
    const { data: waterSourcesIn = [], isLoading } = useGetListWaterSourceByJuntaQuery({ junta: active._id, search }, { refetchOnMountOrArgChange: true })

    return (
        <SettingBlock
            title='Fuentes de agua'
            loading={isLoading}
            action={
                <SettingAction>
                    <LinkBack className='btn btn-neutral text-primary' to={`?w=watersource_create&j=${active._id}`}>Nueva fuente de agua</LinkBack>
                </SettingAction>
            }
            list={
                <>
                    <InputSearch className='my-3 px-3' value={search} onChange={(e) => setSearch(e)} loading={isLoading} />
                    <TableGrid
                        style={{
                            height: '200px'
                        }}
                        rows={waterSourcesIn}
                        columns={
                            [
                                {
                                    label: 'FUENTE DE AGUA',
                                    resize: true,
                                    renderCell: (item) => (
                                        <div className='d-flex align-items-center px-2 py-1'>
                                            <div className='flex-shrink-0 me-3'>
                                                <TypeWaterSource type={item.type} />
                                            </div>
                                            <div className='d-flex flex-column'>
                                                <span className='d-block fw-bolder mb-0'>{item.name}</span>
                                            </div>
                                        </div>
                                    )
                                },
                                {
                                    label: 'JUNTA',
                                    renderCell: (item) => (
                                        item.junta?.name || 'Sin junta de usuarios'
                                    )
                                },
                                {
                                    label: 'ACCIÓN',
                                    pinRight: true,
                                    renderCell: (item) =>
                                        <ButtonGroup>
                                            <Link
                                                className='btn btn-neutral'
                                                to={`/app/schm/irrig/watersource/edit/${item._id}`}
                                                state={{ from: location }}
                                            >
                                                <IoMdEye />
                                            </Link>
                                        </ButtonGroup>
                                }
                            ]
                        }
                    />
                </>
            }
        />
    )
}

const JuntaCommittee = () => {

    const location = useLocation()
    const [search, setSearch] = useState('')
    const { active } = useSelector(state => state.junta)
    const { data: committeesIn = [], isLoading } = useGetListCommByJuntaQuery({ junta: active._id, search }, { refetchOnMountOrArgChange: true })

    return (
        <SettingBlock
            title='Comisiones de usuario'
            loading={isLoading}
            action={
                <SettingAction>
                    <CreateCommittee junta={active} />
                </SettingAction>
            }
            list={
                <>
                    <InputSearch className='my-3 px-3' value={search} onChange={(e) => setSearch(e)} loading={isLoading} />
                    <TableGrid
                        style={{
                            height: '200px'
                        }}
                        rows={committeesIn}
                        columns={
                            [
                                {
                                    label: 'COMISION',
                                    resize: true,
                                    renderCell: (item) => (
                                        <div className='d-flex align-items-center px-2 py-1'>
                                            <div className='flex-shrink-0 me-3'>
                                                <Avatar
                                                    img={item.image?.fileName}
                                                    noImgTxt={item.name}
                                                    circle={true}
                                                    width={40}
                                                    height={40}
                                                />
                                            </div>
                                            <div className='d-flex flex-column'>
                                                <span className='d-block fw-bolder mb-0'>{item.name}</span>
                                            </div>
                                        </div>
                                    )
                                },
                                {
                                    label: 'ESTADO',
                                    renderCell: (item) =>
                                        <TagStatus status={item.status} />
                                },
                                {
                                    label: 'ACCIÓN',
                                    pinRight: true,
                                    renderCell: (item) =>
                                        <ButtonGroup>
                                            <Link
                                                className='btn btn-neutral'
                                                to={`/app/ambit/orgz/comm/${item._id}`}
                                                state={{ from: location }}
                                            >
                                                <IoMdEye />
                                            </Link>
                                        </ButtonGroup>
                                }
                            ]
                        }
                    />
                </>
            }
        />
    )
}