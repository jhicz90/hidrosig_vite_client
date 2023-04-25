import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Tab } from 'react-bootstrap'
import { IoEyeSharp, IoOpen } from 'react-icons/io5'
import { DataTable, InputSearch, LinkBack, SliderNavFlip, TagStatus } from '../../../components'
import { addSearched } from '../../../store/actions'

export const FeeCollectSearchPage = () => {

    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const [typeSearch, setTypeSearch] = useState('user')
    const [list, setList] = useState([
        { _id: '641370225b9141556de5b861', code: '2023-WT62B1Y7', names: 'José Hans', docid: '46891419', active: true },
        { _id: '6418bf6065fc0130b66e925a', code: '2023-V96RAWFF', names: 'Dulce Maria', docid: '72212275', active: true }
    ])

    return (
        <>
            <div className='container-fluid'>
                <div className='row mt-3'>
                    <div className='col-12'>
                        <Tab.Container>
                            <SliderNavFlip>
                                <Button
                                    variant='neutral'
                                    onClick={() => setTypeSearch('usr')}
                                    className={`flicking-panel ${typeSearch === 'usr' ? 'active' : ''}`}
                                >
                                    Usuario
                                </Button>
                                <Button
                                    variant='neutral'
                                    onClick={() => setTypeSearch('prp')}
                                    className={`flicking-panel ${typeSearch === 'prp' ? 'active' : ''}`}
                                >
                                    Predio
                                </Button>
                            </SliderNavFlip>
                        </Tab.Container>
                    </div>
                </div>
            </div>
            <div className='row g-0 justify-content-center'>
                <div className='col'>
                    <InputSearch value={search} onChange={(e) => setSearch(e)} />
                    <DataTable
                        rows={list}
                        columns={
                            [
                                {
                                    label: 'CÓDIGO',
                                    renderCell: (item) =>
                                        item.code
                                },
                                {
                                    label: 'NOMBRE O RAZON SOCIAL',
                                    renderCell: (item) =>
                                        item.names
                                },
                                {
                                    label: 'DOCUMENTO',
                                    renderCell: (item) =>
                                        item.docid
                                },
                                {
                                    label: 'ESTADO',
                                    renderCell: (item) =>
                                        <TagStatus status={item.active} />
                                },
                                {
                                    label: 'ACCIÓN',
                                    width: '200px',
                                    pinRight: true,
                                    renderCell: (item) =>
                                        <div className='d-flex gap-2 p-2'>
                                            <Button
                                                onClick={() => dispatch(addSearched({ id: item._id, title: item.names, typeSearch: 'usr' }))}
                                                variant='neutral-icon'
                                                style={{ padding: '0.5rem' }}
                                            >
                                                <IoEyeSharp size={16} />
                                            </Button>
                                            {/* <LinkBack
                                                to={`/app/coll/bill/usr/${item._id}`}
                                                className='btn btn-neutral-icon'
                                                style={{ padding: '0.5rem' }}
                                            >
                                                <IoEyeSharp size={16} />
                                            </LinkBack>
                                            <LinkBack
                                                to={`/app/coll/bill/usr/${item._id}`}
                                                className='btn btn-neutral-icon'
                                                style={{ padding: '0.5rem' }}
                                                target='_blank'
                                            >
                                                <IoOpen size={16} />
                                            </LinkBack> */}
                                        </div>
                                }
                            ]
                        }
                    />
                </div>
            </div>
        </>
    )
}
