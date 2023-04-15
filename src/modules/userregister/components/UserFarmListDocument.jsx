import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'
import { IoEyeSharp } from 'react-icons/io5'
import { DataTable, InputSearch, LinkBack, TagTimeAgo } from '../../../components'
import { useGetListDocumentByUserFarmQuery, userfarmApi } from '../../../store/actions'
import { docTypes } from '../../../types'

export const UserFarmListDocument = () => {

    const { userid } = useParams()
    const [search, setSearch] = useState('')
    const { data = null } = useSelector(userfarmApi.endpoints.getUserFarmById.select(userid))
    const { data: docsIn = [], isLoading } = useGetListDocumentByUserFarmQuery({ userfarm: userid, search }, { skip: !data })

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
                                <TagTimeAgo timestamp={item.createdAt} />
                        },
                        {
                            label: 'ACTUALIZADO',
                            renderCell: (item) =>
                                <TagTimeAgo timestamp={item.updatedAt} timeago={true} />
                        },
                        {
                            label: 'ACCIÓN',
                            width: '100px',
                            pinRight: true,
                            renderCell: (item) =>
                                <div className='d-flex gap-2 p-2'>
                                    <LinkBack
                                        to={`?w=document_edit&id=${item._id}`}
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
                Ir a DOCUMENTOS
            </Card.Footer>
        </Card>
    )
}
