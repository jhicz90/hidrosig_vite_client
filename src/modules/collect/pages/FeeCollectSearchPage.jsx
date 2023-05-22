import { Button, Tab } from 'react-bootstrap'
import { IoEyeSharp } from 'react-icons/io5'
import { Avatar, DataTable, InputSearch, SliderNavFlip, TagStatus } from '../../../components'
import { typeUserFarm } from '../../../helpers'
import { useCollectStore } from '../../../hooks'
import { useGetListCollectByPrpQuery, useGetListCollectByUsrQuery } from '../../../store/actions'

export const FeeCollectSearchPage = ({ navToTab = null }) => {

    const { search, typeSearch, listSearched, setSearch, setTypeSearch, addTab } = useCollectStore()
    const { data: listUsr = [], isFetching: isLoadingUsr } = useGetListCollectByUsrQuery(search, { skip: !(typeSearch === 'usr' && search.length > 0) })
    const { data: listPrp = [], isFetching: isLoadingPrp } = useGetListCollectByPrpQuery(search, { skip: !(typeSearch === 'prp' && search.length > 0) })

    return (
        <>
            <div className='container-fluid'>
                <div className='row mt-3'>
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
            <div className='row g-0 justify-content-center'>
                <div className='col'>
                    <InputSearch value={search} onChange={(e) => setSearch(e)} loading={isLoadingUsr || isLoadingPrp} />
                    <DataTable
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
                                        width: '200px',
                                        pinRight: true,
                                        renderCell: (item) =>
                                            <div className='d-flex gap-2 p-2'>
                                                <Button
                                                    onClick={() => {

                                                        const usrNav = {
                                                            id: item._id,
                                                            title: `${item.type > 1 ? `${item.socialReason}` : `${item.names} ${item.lastName} ${item.motherLastName}`}`, typeSearch: 'usr',
                                                            navOption: 'debt',
                                                            prpId: null,
                                                            campId: null,
                                                        }

                                                        addTab(usrNav)
                                                        navToTab(item._id, [...listSearched, usrNav])
                                                    }}
                                                    variant='neutral-icon'
                                                    style={{ padding: '0.5rem' }}
                                                >
                                                    <IoEyeSharp size={16} />
                                                </Button>
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
                                    {
                                        label: 'ACCIÓN',
                                        width: '200px',
                                        pinRight: true,
                                        renderCell: (item) =>
                                            <div className='d-flex gap-2 p-2'>
                                                <Button
                                                    onClick={() => {

                                                        const prpNav = {
                                                            id: item._id,
                                                            title: item.name,
                                                            typeSearch: 'prp',
                                                            navOption: 'debt'
                                                        }

                                                        addTab(prpNav)
                                                        navToTab(item._id, [...listSearched, prpNav])
                                                    }}
                                                    variant='neutral-icon'
                                                    style={{ padding: '0.5rem' }}
                                                >
                                                    <IoEyeSharp size={16} />
                                                </Button>
                                            </div>
                                    }
                                ]
                        }
                    />
                </div>
            </div >
        </>
    )
}
