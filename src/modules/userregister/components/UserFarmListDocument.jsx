import { useState } from 'react'
import { ButtonGroup, Card } from 'react-bootstrap'
import { FaPen } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { DataTable, InputSearch, LinkBack, TimeAgo } from '../../../components'
import { useGetListDocumentByUserFarmQuery, userfarmApi } from '../../../store/actions'
import { docTypes } from '../../../types'

export const UserFarmListDocument = () => {

    const { userid } = useParams()
    const [search, setSearch] = useState('')
    const { data = null } = useSelector(userfarmApi.endpoints.getUserFarmById.select(userid))
    const { data: docsIn = [], isLoading } = useGetListDocumentByUserFarmQuery({ userfarm: userid, search }, { refetchOnMountOrArgChange: true, skip: !data })

    return (
        <Card>
            <InputSearch value={search} onChange={(e) => setSearch(e)} loading={isLoading} />
            <DataTable
                rows={docsIn}
                columns={
                    [
                        {
                            label: 'NOMBRE',
                            renderCell: (item) =>
                            <div className='d-flex flex-column'>
                                    <p
                                        className='d-block text-primary fw-bolder mb-0'
                                    >
                                        {item.name}
                                    </p>
                                    <span>{docTypes.find(d => d.type === item.type).name}</span>
                                </div>
                        },
                        {
                            label: 'FIRMANTE',
                            renderCell: (item) =>
                                item.signer
                        },
                        {
                            label: 'CREADO',
                            renderCell: (item) =>
                                <TimeAgo timestamp={item.createdAt} />
                        },
                        {
                            label: 'ACTUALIZADO',
                            renderCell: (item) =>
                                <TimeAgo timestamp={item.updatedAt} timeago={true} />
                        },
                        {
                            label: 'ACCIÓN',
                            width: '100px',
                            pinRight: true,
                            renderCell: (item) =>
                                <ButtonGroup>
                                    <LinkBack
                                        className='btn btn-neutral'
                                        to={`?w=document_edit&id=${item._id}`}
                                    >
                                        <FaPen />
                                    </LinkBack>
                                </ButtonGroup>
                        }
                    ]
                }
            />
            <Card.Footer className='p-3 text-center'>
                Ir a DOCUMENTOS
            </Card.Footer>
        </Card>
    )
}
