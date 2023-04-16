import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'
import { IoEyeSharp } from 'react-icons/io5'
import { DataTable, InputSearch, LinkBack, TypeWaterSource } from '../../../components'
import { juntaApi, useGetListWaterSourceByJuntaQuery } from '../../../store/actions'

export const JuntaAmbitWaterSource = () => {

    const { juntaid } = useParams()
    const [search, setSearch] = useState('')
    const { data = null } = useSelector(juntaApi.endpoints.getJuntaById.select(juntaid))
    const { data: waterSourcesIn = [], isLoading } = useGetListWaterSourceByJuntaQuery({ junta: data?._id, search }, { skip: !data })

    return (
        <Card>
            <InputSearch value={search} onChange={(e) => setSearch(e)} loading={isLoading} />
            <DataTable
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
                                <div className='d-flex gap-2 p-2'>
                                    <LinkBack
                                        to={`/app/schm/irrig/ws/${item._id}`}
                                        className='btn btn-neutral-icon'
                                        style={{ padding: '0.5rem' }}
                                    >
                                        <IoEyeSharp size={16} />
                                    </LinkBack>
                                </div>
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