import { Link } from 'react-router-dom'
import { Button, Tab } from 'react-bootstrap'
import { IoEyeSharp, IoOpen } from 'react-icons/io5'
import { Avatar, DataTable, InputSearch, SliderNavFlip, TagStatus } from '../../../components'
import { typeUserFarm } from '../../../helpers'
import { useCollectStore } from '../../../hooks'
import { useGetListCollectByPrpQuery, useGetListCollectByUsrQuery } from '../../../store/actions'

export const FeeCollectSearchPage = () => {

    const { search, typeSearch, setSearch, setTypeSearch } = useCollectStore()
    const { data: listUsr = [], isFetching: isLoadingUsr } = useGetListCollectByUsrQuery(search, { skip: !(typeSearch === 'usr' && search.length > 0) })
    const { data: listPrp = [], isFetching: isLoadingPrp } = useGetListCollectByPrpQuery(search, { skip: !(typeSearch === 'prp' && search.length > 0) })

    return (
        <>
            <div className='container-fluid'>
                <div className='row my-2'>
                    <div className='col-12'>
                        <div className='row align-items-center justify-content-between g-3'>
                            <div className='col-12 col-md-auto'>
                                <h4 className='mb-0'>CORBANZA DE TARIFA</h4>
                            </div>
                            {/* <div className='col-12 col-md-auto'>
                                <div className='d-flex gap-2'>
                                    {lvlAccess < 3 && <LinkBack className='btn btn-neutral text-primary' to={`junta/create`}>Nueva junta</LinkBack>}
                                    <LinkBack className='btn btn-neutral text-primary' to={`comm/create`}>Nuevo comisión</LinkBack>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className='container-fluid'>
                <div className='row mt-2'>
                    <div className='col-12'>
                        <Tab.Container>
                            <SliderNavFlip>
                                <Button
                                    variant='neutral'
                                    onClick={() => {
                                        setTypeSearch('usr')
                                        setSearch('')
                                    }}
                                    className={`flicking-panel ${typeSearch === 'usr' ? 'active' : ''}`}
                                >
                                    Usuario
                                </Button>
                                <Button
                                    variant='neutral'
                                    onClick={() => {
                                        setTypeSearch('prp')
                                        setSearch('')
                                    }}
                                    className={`flicking-panel ${typeSearch === 'prp' ? 'active' : ''}`}
                                >
                                    Predio
                                </Button>
                            </SliderNavFlip>
                        </Tab.Container>
                    </div>
                </div>
            </div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-12'>
                        <InputSearch value={search} onChange={(e) => setSearch(e)} loading={isLoadingUsr || isLoadingPrp} />
                        <DataTable
                            className='border border-2 border-light-subtle'
                            rows={
                                typeSearch === 'usr'
                                    ?
                                    listUsr
                                    :
                                    listPrp
                            }
                            columns={
                                typeSearch === 'usr'
                                    ?
                                    [
                                        {
                                            label: 'CÓDIGO',
                                            width: '160px',
                                            renderCell: (item) =>
                                                item.code
                                        },
                                        {
                                            label: 'USUARIO',
                                            minWidth: '300px',
                                            renderCell: (item) => (
                                                <div className='d-flex align-items-center px-2 py-1'>
                                                    <div className='flex-shrink-0 me-3'>
                                                        <Avatar
                                                            img={item.image?.metadata.url}
                                                            cloud={item.image?.cloud}
                                                            noImgTxt={item.type > 1 ? item.socialReason : item.names}
                                                            noImg={4004}
                                                            circle={true}
                                                            width={40}
                                                            height={40}
                                                        />
                                                    </div>
                                                    <div className='d-flex flex-column'>
                                                        <p
                                                            className='d-block text-primary fw-bolder mb-0'
                                                        >
                                                            {item.type > 1 ? `${item.socialReason}` : `${item.names} ${item.lastName} ${item.motherLastName}`}
                                                        </p>
                                                        <span>{typeUserFarm(item.type)}</span>
                                                    </div>
                                                </div>
                                            )
                                        },
                                        {
                                            label: 'ESTADO',
                                            width: '120px',
                                            renderCell: (item) =>
                                                <TagStatus status={item.active} />
                                        },
                                        {
                                            label: 'ACCIÓN',
                                            width: '160px',
                                            pinRight: true,
                                            renderCell: (item) =>
                                                <div className='d-flex gap-2 p-2'>
                                                    <Link
                                                        to={`/app/coll/bill/usr/${item._id}`}
                                                        className='btn btn-neutral-icon'
                                                        style={{ padding: '0.25rem', justifyContent: 'center', width: '40px', height: '40px' }}
                                                    >
                                                        <IoEyeSharp size={20} />
                                                    </Link>
                                                    <Link
                                                        to={`/app/coll/bill/usr/${item._id}`}
                                                        target='_blank'
                                                        className='btn btn-neutral-icon'
                                                        style={{ padding: '0.25rem', justifyContent: 'center', width: '40px', height: '40px' }}
                                                    >
                                                        <IoOpen size={20} />
                                                    </Link>
                                                </div>
                                        }
                                    ]
                                    :
                                    [
                                        {
                                            label: 'CÓDIGO',
                                            width: '180px',
                                            renderCell: (item) =>
                                                item.code
                                        },
                                        {
                                            label: 'PREDIO',
                                            minWidth: '250px',
                                            renderCell: (item) => (
                                                <div className='d-flex flex-column'>
                                                    <p
                                                        className='d-block text-primary fw-bolder mb-0'
                                                    >
                                                        {item.name}
                                                    </p>
                                                    <span>{item.code}</span>
                                                </div>
                                            )
                                        },
                                        {
                                            label: 'ESTADO',
                                            width: '120px',
                                            renderCell: (item) =>
                                                <TagStatus status={item.active} />
                                        },
                                        // {
                                        //     label: 'ACCIÓN',
                                        //     width: '200px',
                                        //     pinRight: true,
                                        //     renderCell: (item) =>
                                        //         <div className='d-flex gap-2 p-2'>
                                        //             <Link
                                        //                 to={`/app/coll/bill/prp/${item._id}`}
                                        //                 className='btn btn-neutral-icon'
                                        //                 style={{ padding: '0.25rem', justifyContent: 'center', width: '40px', height: '40px' }}
                                        //             >
                                        //                 <IoEyeSharp size={20} />
                                        //             </Link>
                                        //             <Link
                                        //                 to={`/app/coll/bill/prp/${item._id}`}
                                        //                 target='_blank'
                                        //                 className='btn btn-neutral-icon'
                                        //                 style={{ padding: '0.25rem', justifyContent: 'center', width: '40px', height: '40px' }}
                                        //             >
                                        //                 <IoOpen size={20} />
                                        //             </Link>
                                        //         </div>
                                        // }
                                    ]
                            }
                        />
                    </div>
                </div>
            </div>
        </>
    )
}