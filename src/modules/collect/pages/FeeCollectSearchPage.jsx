import { useState } from 'react'
import { Button, Card, Nav, Tab } from 'react-bootstrap'
import { IoEyeSharp } from 'react-icons/io5'
import { DataTable, InputSearch, LinkBack, SliderNavFlip } from '../../../components'

export const FeeCollectSearchPage = () => {

    const [search, setSearch] = useState('')
    const [typeSearch, setTypeSearch] = useState('user')
    const [list, setList] = useState([])

    return (
        <>
            <div className='container-fluid'>
                <div className='row my-3'>
                    <div className='col-12'>
                        <div className='row align-items-center justify-content-between g-3'>
                            <div className='col-12 col-md-auto'>
                                <h4 className='mb-0'>COBRANZA DE TARIFA</h4>
                            </div>
                            <div className='col-12 col-md-auto'>
                                <div className='d-flex gap-2'>
                                    <LinkBack className='btn btn-neutral text-primary' relative to={`create`}>Nueva busqueda</LinkBack>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <Tab.Container>
                            <SliderNavFlip>
                                <Button
                                    variant='neutral'
                                    onClick={() => setTypeSearch('user')}
                                    className={`flicking-panel ${typeSearch === 'user' ? 'active' : ''}`}
                                >
                                    Usuario
                                </Button>
                                <Button
                                    variant='neutral'
                                    onClick={() => setTypeSearch('nompred')}
                                    className={`flicking-panel ${typeSearch === 'nompred' ? 'active' : ''}`}
                                >
                                    Nombre de predio
                                </Button>
                                <Button
                                    variant='neutral'
                                    onClick={() => setTypeSearch('docid')}
                                    className={`flicking-panel ${typeSearch === 'docid' ? 'active' : ''}`}
                                >
                                    Documento de identidad
                                </Button>
                                <Button
                                    variant='neutral'
                                    onClick={() => setTypeSearch('coduser')}
                                    className={`flicking-panel ${typeSearch === 'coduser' ? 'active' : ''}`}
                                >
                                    Código de usuario
                                </Button>
                                <Button
                                    variant='neutral'
                                    onClick={() => setTypeSearch('codpred')}
                                    className={`flicking-panel ${typeSearch === 'codpred' ? 'active' : ''}`}
                                >
                                    Código de predio
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
                                        item.social
                                },
                                {
                                    label: 'DOCUMENTO',
                                    renderCell: (item) =>
                                        item.name
                                },
                                {
                                    label: 'CREADO',
                                    renderCell: (item) =>
                                        item.receipt
                                },
                                {
                                    label: 'ACTUALIZADO',
                                    renderCell: (item) =>
                                        item.check
                                },
                                {
                                    label: 'ACCIÓN',
                                    width: '100px',
                                    pinRight: true,
                                    renderCell: (item) =>
                                        <div className='d-flex gap-2 p-2'>
                                            <LinkBack
                                                to={`/app/acct/petty_cash/${item._id}`}
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
                </div>
            </div>
        </>
    )
}
