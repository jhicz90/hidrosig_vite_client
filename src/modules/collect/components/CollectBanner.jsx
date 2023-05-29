import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card, ListGroup } from 'react-bootstrap'
import { typeUserFarm } from '../../../helpers'
import { Avatar, FarmsLoader, TagNewReg } from '../../../components'
import { useGetListFarmByUserFarmQuery, userfarmApi } from '../../../store/actions'
import { AreaFarmListCampaign } from '..'

export const CollectBanner = () => {

    const { usrid } = useParams()
    const navigate = useNavigate()
    const { data = null } = useSelector(userfarmApi.endpoints.getUserFarmById.select(usrid))
    const { data: listFarms = [], isFetching } = useGetListFarmByUserFarmQuery({ userfarm: usrid })

    return (
        <>
            <div className='row row-cols-1 row-cols-md-1 gy-3 gx-0'>
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
                <Card style={{ maxHeight: '250px' }}>
                    {
                        isFetching
                            ?
                            <FarmsLoader />
                            :
                            <ListGroup variant='flush'>
                                {
                                    listFarms.map(frm =>
                                        <NavLink
                                            key={frm._id}
                                            to={`${frm._id}`}
                                            className={({ isActive }) => {
                                                const classItem = 'list-group-item list-group-item-action'
                                                return isActive ? `${classItem} list-group-item-primary` : classItem
                                            }}
                                        >
                                            <div className='d-flex flex-column'>
                                                <div><b className='d-inline-block'>{frm.name}</b> -  <div className='d-inline-block'>{frm.code}</div></div>
                                                <div className='row' style={{ fontSize: '0.75rem' }}>
                                                    <div className='col-5'>Saldo actual:</div>
                                                    <div className='col-7'>100.00</div>
                                                </div>
                                                <div className='row' style={{ fontSize: '0.75rem' }}>
                                                    <div className='col-5'>Saldo atrasadas:</div>
                                                    <div className='col-7'>200.00</div>
                                                </div>
                                                <div className='row' style={{ fontSize: '0.75rem' }}>
                                                    <div className='col-5'>Saldo total:</div>
                                                    <div className='col-7'>300.00</div>
                                                </div>
                                            </div>
                                        </NavLink>
                                    )
                                }
                            </ListGroup>
                    }
                </Card>
                <AreaFarmListCampaign />
            </div >
        </>
    )
}
