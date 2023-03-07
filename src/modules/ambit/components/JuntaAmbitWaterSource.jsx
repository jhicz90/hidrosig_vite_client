import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useParams } from 'react-router-dom'
import { ButtonGroup, Card, ListGroup } from 'react-bootstrap'
import { IoMdEye } from 'react-icons/io'
import { FaPen } from 'react-icons/fa'
import { juntaApi, useGetListCommByJuntaQuery, useGetListWaterSourceByJuntaQuery, useGetListZoneByJuntaQuery } from '../../../store/actions'
import { Avatar, InputSearch, LinkBack, SettingAction, SettingBlock, TableGrid, TagStatus, TypeWaterSource } from '../../../components'
import { CreateZone, CreateCommittee } from '.'

export const JuntaAmbitWaterSource = () => {

    const { juntaid } = useParams()
    const [search, setSearch] = useState('')
    const { data = null } = useSelector(juntaApi.endpoints.getJuntaById.select(juntaid))
    const { data: waterSourcesIn = [], isLoading } = useGetListWaterSourceByJuntaQuery({ junta: data?._id, search }, { refetchOnMountOrArgChange: true, skip: !data })

    return (
        <Card>
            <InputSearch className='my-3 px-3' value={search} onChange={(e) => setSearch(e)} loading={isLoading} />
            <TableGrid
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
                                    <LinkBack
                                        className='btn btn-neutral'
                                        to={`?w=watersource_edit&id=${item._id}`}
                                    >
                                        <FaPen />
                                    </LinkBack>
                                </ButtonGroup>
                        }
                    ]
                }
            />
            <Card.Footer className='p-3 text-center'>
                Ir a FUENTES DE AGUA
            </Card.Footer>
        </Card>
    )
}