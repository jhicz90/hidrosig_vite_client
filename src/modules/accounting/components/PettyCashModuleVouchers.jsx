import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, ListGroup } from 'react-bootstrap'
import { FaPen } from 'react-icons/fa'
import { useGetVouchersByPettyCashQuery } from '../../../store/actions'
import { SettingAction, SettingBlock, TableGrid, TimeAgo } from '../../../components'

export const PettyCashModuleVouchers = () => {
    return (
        <Card>
            <ListGroup variant='flush'>
                <PettyCashVoucher />
            </ListGroup>
        </Card>
    )
}

const PettyCashVoucher = () => {

    const { active } = useSelector(state => state.pettycash)
    const { data: vouchersIn = [], isLoading } = useGetVouchersByPettyCashQuery({ pettycash: active._id, search: '' }, { refetchOnMountOrArgChange: true })

    return (
        <SettingBlock
            title='Comprobantes'
            loading={isLoading}
            action={
                <SettingAction>
                    <button className='btn btn-neutral'>Nuevo comprobante</button>
                </SettingAction>
            }
            list={
                <TableGrid
                    renderEmpty={() => <strong className='mx-3 fs-5'>No ahi comprobantes asociadas a esta caja chica</strong>}
                    rows={vouchersIn}
                    columns={
                        [
                            {
                                label: 'TIPO',
                                width: '80px',
                                renderCell: (item) =>
                                    item.typeReceipt
                            },
                            {
                                label: 'SERIE',
                                width: '80px',
                                renderCell: (item) =>
                                    item.serie
                            },
                            {
                                label: 'N° COMPROBANTE',
                                renderCell: (item) =>
                                    item.numReceipt
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
                                pinRight: true,
                                renderCell: (item) =>
                                    <div className='btn-group'>
                                        <Link
                                            className='btn btn-neutral'
                                            to={`/app/acct//${item._id}`}
                                        >
                                            <FaPen />
                                        </Link>
                                    </div>
                            }
                        ]
                    }
                />
            }
        >
            {vouchersIn.length}
        </SettingBlock>
    )
}
