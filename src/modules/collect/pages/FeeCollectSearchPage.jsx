import { Link } from 'react-router-dom'
import { Button, ButtonGroup, Tab } from 'react-bootstrap'
import { IoEyeSharp, IoOpen } from 'react-icons/io5'
import { Avatar, ContainerController, DataTable, InputSearch, SliderNavFlip, TagStatus } from '../../../components'
import { typeUserFarm } from '../../../helpers'
import { useCollectStore } from '../../../hooks'
import { useGetListCollectByPrpQuery, useGetListCollectByUsrQuery } from '../../../store/actions'

export const FeeCollectSearchPage = () => {

    const { search, typeSearch, setSearch, setTypeSearch } = useCollectStore()
    const { data: listUsr = [], isLoading: isLoadingUsr, isFetching: isFetchingUsr } = useGetListCollectByUsrQuery(search, { skip: !(typeSearch === 'usr' && search.length > 0) })
    const { data: listPrp = [], isLoading: isLoadingPrp, isFetching: isFetchingPrp } = useGetListCollectByPrpQuery(search, { skip: !(typeSearch === 'prp' && search.length > 0) })

    return (
        <ContainerController>
            <div className='d-lg-flex align-items-lg-center justify-content-lg-between my-3'>
                <div className='min-w-400 flex-1'>
                    <h4 className='mb-0 text-uppercase'>CORBANZA DE TARIFA</h4>
                    {/* <div className='mt-1 mt-sm-0 d-flex flex-column flex-sm-row gap-0 gap-sm-4'>
                        <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                            <MdOutlineFormatListNumbered size={20} />
                            {list.length}
                        </div>
                    </div> */}
                </div>
                <div className='mt-3 ms-lg-5 mt-lg-0 d-flex gap-2 flex-wrap'>
                    {/* <Link
                        to={`create`}
                        className='btn btn-sm btn-primary d-flex align-items-center gap-2'
                    >
                        <FaPlus />
                        Nueva caja chica
                    </Link> */}
                    <ButtonGroup>
                        <Button
                            variant='neutral'
                            size='sm'
                            onClick={() => {
                                setTypeSearch('usr')
                                setSearch('')
                            }}
                            className={`${typeSearch === 'usr' ? 'active' : ''}`}
                        >
                            Usuario
                        </Button>
                        <Button
                            variant='neutral'
                            size='sm'
                            onClick={() => {
                                setTypeSearch('prp')
                                setSearch('')
                            }}
                            className={`${typeSearch === 'prp' ? 'active' : ''}`}
                        >
                            Predio
                        </Button>
                    </ButtonGroup>
                    {/* <LinkBack className='btn btn-neutral text-primary' relative to={`create`}>Nueva caja chica</LinkBack> */}
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <InputSearch value={search} onChange={(e) => setSearch(e)} loading={isFetchingUsr || isFetchingPrp} />
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <DataTable
                        className='border border-2 border-light-subtle'
                        loading={isLoadingUsr || isLoadingPrp}
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
        </ContainerController>
    )
}