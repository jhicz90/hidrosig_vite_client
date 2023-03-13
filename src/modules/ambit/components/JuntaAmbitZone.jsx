import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ButtonGroup, Card } from 'react-bootstrap'
import { FaPen } from 'react-icons/fa'
import { juntaApi, useGetListZoneByJuntaQuery } from '../../../store/actions'
import { InputSearch, LinkBack, TableGrid } from '../../../components'

export const JuntaAmbitZone = () => {

    const { juntaid } = useParams()
    const [search, setSearch] = useState('')
    const { data = null } = useSelector(juntaApi.endpoints.getJuntaById.select(juntaid))
    const { data: zonesIn = [], isLoading } = useGetListZoneByJuntaQuery({ junta: data?._id, search }, { refetchOnMountOrArgChange: true, skip: !data })

    return (
        <Card>
            <InputSearch value={search} onChange={(e) => setSearch(e)} loading={isLoading} />
            <TableGrid
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
            <Card.Footer className='p-3 text-center'>
                Ir a ZONAS
            </Card.Footer>
        </Card>
    )
}