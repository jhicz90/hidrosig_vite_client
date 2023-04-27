import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'
import moment from 'moment'
import { TagOpened } from '..'
import { DataTable, InputSearch, LinkBack, TagStatus } from '../../../components'
import { juntaApi, useGetListYearRateByJuntaQuery } from '../../../store/actions'
import { IoEyeSharp } from 'react-icons/io5'

export const JuntaYearRate = () => {

    const { juntaid } = useParams()
    const [search, setSearch] = useState('')
    const { data = null } = useSelector(juntaApi.endpoints.getJuntaById.select(juntaid))
    const { data: yearsrateIn = [], isLoading } = useGetListYearRateByJuntaQuery({ junta: data?._id, search }, { skip: !data })

    return (
        <Card className='overflow-hidden'>
            <div className='d-flex align-items-center'>
                <InputSearch value={search} onChange={(e) => setSearch(e)} loading={isLoading} />
                <LinkBack
                    className='btn btn-primary'
                    to={`/app/ambit/orgz/yr/create`}
                    state={{ junta: data || '' }}
                >
                    Agregar periodo
                </LinkBack>
            </div>
            <DataTable
                rows={yearsrateIn}
                columns={
                    [
                        {
                            label: 'AÑO - CAMPAÑA',
                            resize: true,
                            renderCell: (item) => (
                                <div>{`${item.year} - ${item.campaign === 1 ? 'CHICA - I' : 'GRANDE - II'}`}</div>
                            )
                        },
                        {
                            label: 'PERIODO',
                            renderCell: (item) =>
                                <div>{`${moment().month(item.monthStart - 1).format('MMMM').toUpperCase()} - ${moment().month(item.monthEnd - 1).format('MMMM').toUpperCase()}`}</div>
                        },
                        {
                            label: 'APERTURADO',
                            renderCell: (item) =>
                                <TagOpened yearRateId={item._id} opened={item.opened} />
                        },
                        {
                            label: 'ESTADO',
                            renderCell: (item) =>
                                <TagStatus status={item.active} />
                        },
                        {
                            label: 'ACCIÓN',
                            pinRight: true,
                            renderCell: (item) =>
                                <div className='d-flex gap-2 p-2'>
                                    <LinkBack
                                        to={`/app/ambit/trrty/zone/${item._id}`}
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
