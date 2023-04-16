import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'
import { IoEyeSharp } from 'react-icons/io5'
import { DataTable, InputSearch, LinkBack } from '../../../components'
import { farmApi } from '../../../store/actions'

export const AreaFarmWaterIn = () => {

    const { prpid } = useParams()
    const [search, setSearch] = useState('')
    const { data = null, isLoading } = useSelector(farmApi.endpoints.getFarmById.select(prpid))

    return (
        <Card className='overflow-hidden'>
            <div className='d-flex align-items-center'>
                <InputSearch value={search} onChange={(e) => setSearch(e)} loading={isLoading} />
                <LinkBack
                    className='btn btn-primary'
                    to={`/app/user_reg/user_farm/wt/create`}
                    state={{ farm: data || '' }}
                >
                    Agregar toma de agua
                </LinkBack>
            </div>
            <DataTable
                rows={data.inputIrrig}
                columns={
                    [
                        {
                            label: 'ORDEN',
                            minWidth: '50px',
                            renderCell: (item) => (
                                item.order
                            )
                        },
                        {
                            label: 'AREA DE RIEGO',
                            minWidth: '50px',
                            renderCell: (item) => (
                                item.areaUse
                            )
                        },
                        {
                            label: 'SISTEMA DE RIEGO',
                            minWidth: '50px',
                            renderCell: (item) => (
                                item.irrigSystem.name
                            )
                        },
                        {
                            label: 'VOLUMEN',
                            minWidth: '50px',
                            renderCell: (item) => (
                                <strong>{Number(item.regulation)}</strong>
                            )
                        },
                        {
                            label: 'ACCIÓN',
                            pinRight: true,
                            renderCell: (item) =>
                                <div className='d-flex gap-2 p-2'>
                                    <LinkBack
                                        to={``}
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
        </Card>
    )
}