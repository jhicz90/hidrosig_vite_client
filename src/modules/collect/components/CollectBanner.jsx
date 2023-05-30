import { NavLink, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'
import { IoArrowForward } from 'react-icons/io5'
import { typeUserFarm } from '../../../helpers'
import { Avatar, DataTable, FarmsLoader, TagNewReg } from '../../../components'
import { useGetListFarmByUserFarmQuery, userfarmApi } from '../../../store/actions'
import { AreaFarmListCampaign } from '..'

export const CollectBanner = ({ children }) => {

    const { usrid } = useParams()
    const { data = null } = useSelector(userfarmApi.endpoints.getUserFarmById.select(usrid))
    const { data: listFarms = [], isFetching } = useGetListFarmByUserFarmQuery({ userfarm: usrid })

    return (
        <>
            <div className='row'>
                <div className='col-12 col-lg-5 col-xl-3'>
                    <div className='row rows-cols-1 gy-3 gx-0'>
                        <Card>
                            <Card.Body>
                                <div className='row align-items-center g-3 text-center text-xxl-start'>
                                    <div className='col-12 col-xxl-auto'>
                                        <Avatar
                                            noImgTxt={data?.type > 1 ? `${data?.socialReason}` : `${data?.names} ${data?.lastName} ${data?.motherLastName}`}
                                            noImg={4004}
                                            img={data?.image?.metadata.url}
                                            cloud={data?.image?.cloud}
                                            width={75}
                                            height={75}
                                        />
                                    </div>
                                    <div className='col-12 col-sm-auto flex-1'>
                                        <TagNewReg time={data?.createdAt} />
                                        <div className='fw-bolder mb-0'>{data?.type > 1 ? `${data?.socialReason}` : `${data?.names} ${data?.lastName} ${data?.motherLastName}`}</div>
                                        <div className='mb-0'>{data?.docid}</div>
                                        <p className='mb-0'>{typeUserFarm(data?.type)}</p>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                        <AreaFarmListCampaign />
                    </div>
                </div>
                <div className='col-12 col-lg-7 col-xl-9'>
                    <div className='row rows-cols-1 gy-3 gx-0'>
                        <Card style={{ overflow: 'hidden' }}>
                            {
                                isFetching
                                    ?
                                    <FarmsLoader />
                                    :
                                    <DataTable
                                        height='200px'
                                        maxHeightRow='60px'
                                        minHeightRowCell='30px'
                                        rows={listFarms}
                                        columns={
                                            [
                                                {
                                                    label: 'CÓDIGO',
                                                    width: '180px',
                                                    renderCell: (item) =>
                                                        item.code
                                                },
                                                {
                                                    label: 'NOMBRE PREDIO',
                                                    width: '300px',
                                                    renderCell: (item) =>
                                                        <NavLink
                                                            to={`${item._id}`}
                                                            className={({ isActive }) => `${isActive ? `text-decoration-none text-primary w-100 d-block` : `text-decoration-none text-secondary w-100 d-block`}`}
                                                        >
                                                            {item.name} <IoArrowForward />
                                                        </NavLink>
                                                },
                                                {
                                                    label: 'UNIDAD CATASTRAL',
                                                    width: '120px',
                                                    renderCell: (item) =>
                                                        item.cadUnit
                                                },
                                                {
                                                    label: 'AREA TOTAL',
                                                    width: '120px',
                                                    isNumber: true,
                                                    renderCell: (item) =>
                                                        item.areaTotal.toFixed(5)
                                                },
                                                {
                                                    label: 'AREA BAJO RIEGO',
                                                    width: '120px',
                                                    isNumber: true,
                                                    renderCell: (item) =>
                                                        item.areaUse.toFixed(5)
                                                },
                                                {
                                                    label: 'SALDO ACTUAL',
                                                    width: '120px',
                                                    isNumber: true,
                                                    renderCell: (item) =>
                                                        Number(100).toFixed(2)
                                                },
                                                {
                                                    label: 'SALDO ATRASADO',
                                                    width: '120px',
                                                    isNumber: true,
                                                    renderCell: (item) =>
                                                        Number(200).toFixed(2)
                                                },
                                                {
                                                    label: 'SALDO CONVENIO',
                                                    width: '120px',
                                                    isNumber: true,
                                                    renderCell: (item) =>
                                                        Number(0).toFixed(2)
                                                },
                                                {
                                                    label: 'SALDO TOTAL',
                                                    width: '120px',
                                                    isNumber: true,
                                                    renderCell: (item) =>
                                                        Number(300).toFixed(2)
                                                },
                                            ]
                                        }
                                    />
                            }
                        </Card>
                        {children}
                    </div>
                </div>
            </div >
        </>
    )
}