import { useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button, Card, ListGroup, Modal } from 'react-bootstrap'
import { typeUserFarm } from '../../../helpers'
import { Avatar, CellGrid, CellRow, DataTable, FarmsLoader, HeaderGrid, ScrollbarsShadow, TagNewReg } from '../../../components'
import { useGetListFarmByUserFarmQuery, userfarmApi } from '../../../store/actions'
import { AreaFarmListCampaign } from '..'

export const CollectBanner = ({ children }) => {

    const { usrid } = useParams()
    const navigate = useNavigate()
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
                                                            className={({ isActive }) => `${isActive ? `text-decoration-none text-primary` : `text-decoration-none text-secondary`}`}
                                                        >
                                                            {item.name}
                                                        </NavLink>
                                                },
                                                {
                                                    label: 'UNIDAD CATASTRAL',
                                                    width: '100px',
                                                    renderCell: (item) =>
                                                        item.cadUnit
                                                },
                                                {
                                                    label: 'AREA TOTAL',
                                                    width: '100px',
                                                    isNumber: true,
                                                    renderCell: (item) =>
                                                        item.areaTotal.toFixed(5)
                                                },
                                                {
                                                    label: 'AREA BAJO RIEGO',
                                                    width: '100px',
                                                    isNumber: true,
                                                    renderCell: (item) =>
                                                        item.areaUse.toFixed(5)
                                                },
                                                {
                                                    label: 'SALDO ACTUAL',
                                                    width: '100px',
                                                    isNumber: true,
                                                    renderCell: (item) =>
                                                        Number(100).toFixed(2)
                                                },
                                                {
                                                    label: 'SALDO ATRASADO',
                                                    width: '100px',
                                                    isNumber: true,
                                                    renderCell: (item) =>
                                                        Number(200).toFixed(2)
                                                },
                                                {
                                                    label: 'SALDO CONVENIO',
                                                    width: '100px',
                                                    isNumber: true,
                                                    renderCell: (item) =>
                                                        Number(0).toFixed(2)
                                                },
                                                {
                                                    label: 'SALDO TOTAL',
                                                    width: '100px',
                                                    isNumber: true,
                                                    renderCell: (item) =>
                                                        Number(300).toFixed(2)
                                                },
                                            ]
                                        }
                                    />
                                // <div
                                //     className='d-grid'
                                //     style={{
                                //         overflowX: 'auto',
                                //         // gap: '2px',
                                //         gridTemplateColumns: '150px 300px 100px 100px 100px 100px 100px 100px auto',
                                //         gridTemplateRows: '50px'
                                //     }}
                                // >
                                //     <HeaderGrid>Código</HeaderGrid>
                                //     <HeaderGrid>Nombre predio</HeaderGrid>
                                //     <HeaderGrid>Unidad Catastral</HeaderGrid>
                                //     <HeaderGrid>Area total</HeaderGrid>
                                //     <HeaderGrid>Area bajo riego</HeaderGrid>
                                //     <HeaderGrid>Saldo actual</HeaderGrid>
                                //     <HeaderGrid>Saldo atrasado</HeaderGrid>
                                //     <HeaderGrid>Saldo convenio</HeaderGrid>
                                //     <HeaderGrid>Saldo total</HeaderGrid>
                                //     <ScrollbarsShadow autoHide autoHeight autoHeightMin={200} autoHeightMax={200}>
                                //     {
                                //         listFarms.map(frm =>
                                //             <NavLink
                                //                 key={frm._id}
                                //                 to={`${frm._id}`}
                                //                 style={{ display: 'contents', color: 'black' }}
                                //                 className={({ isActive }) => `${isActive ? `text-primary` : ``}`}
                                //             >
                                //                 <CellRow>
                                //                     <CellGrid>{frm.code}</CellGrid>
                                //                     <CellGrid>{frm.name}</CellGrid>
                                //                     <CellGrid>{frm.cadUnit}</CellGrid>
                                //                     <CellGrid isNumber={true}>{frm.areaTotal.toFixed(5)}</CellGrid>
                                //                     <CellGrid isNumber={true}>{frm.areaUse.toFixed(5)}</CellGrid>
                                //                     <CellGrid isNumber={true}>{Number(100).toFixed(2)}</CellGrid>
                                //                     <CellGrid isNumber={true}>{Number(200).toFixed(2)}</CellGrid>
                                //                     <CellGrid isNumber={true}>{Number(0).toFixed(2)}</CellGrid>
                                //                     <CellGrid isNumber={true}>{Number(300).toFixed(2)}</CellGrid>
                                //                 </CellRow>
                                //             </NavLink>
                                //         )
                                //     }
                                //     </ScrollbarsShadow>
                                // </div>
                            }
                        </Card>
                        {children}
                    </div>
                </div>
            </div >
        </>
    )
}