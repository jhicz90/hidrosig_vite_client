import { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Button, Collapse, Dropdown } from 'react-bootstrap'
import { AiFillNotification } from 'react-icons/ai'
import { IoEllipsisVertical } from 'react-icons/io5'
import { TbReportMoney } from 'react-icons/tb'
import { GiReceiveMoney } from 'react-icons/gi'
import { DataTable, LoadingAction, TagStatus, TagTimeAgo } from '../../../components'
import { useGetListFarmByUserFarmQuery } from '../../../store/actions'
import { FeeCollectBillDebt, FeeCollectBillPay } from '..'

export const FeeCollectBillUserFarmPage = ({ usrId = '' }) => {

    const navigate = useNavigate()
    const [showFarms, setShowFarms] = useState(true)
    const [activePrp, setActivePrp] = useState(null)
    const { data: farmsIn = [], isLoading } = useGetListFarmByUserFarmQuery({ userfarm: usrId, search: '' })

    return (
        <>
            <div className='container-fluid'>
                <div className='row my-3'>
                    <div className='col-12'>
                        <div className='row align-items-center justify-content-between g-3'>
                            <div className='col-12 col-md-auto'>
                                <div className='d-flex gap-2'>
                                    <Button variant='primary' className='d-flex align-items-center gap-2'>
                                        <AiFillNotification size={24} />
                                        Generar notificación
                                    </Button>
                                    <Button
                                        onClick={() => setShowFarms(!showFarms)}
                                        variant='neutral'
                                    >
                                        Lista de predios
                                    </Button>
                                    <Dropdown className='dropdown-noarrow'>
                                        <Dropdown.Toggle variant='neutral' className='d-flex align-items-center'>
                                            <IoEllipsisVertical size={24} />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item>Reportes</Dropdown.Item>
                                            <Dropdown.Item>Imprimir</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Collapse in={showFarms}>
                <div
                    className='row g-0 justify-content-center'
                    style={{ borderTop: '2px solid blue', borderBottom: '2px solid blue' }}
                >
                    <div className='col'>
                        {
                            isLoading
                                ?
                                <LoadingAction />
                                :
                                <DataTable
                                    height='200px'
                                    rows={farmsIn}
                                    columns={
                                        [
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
                                                renderCell: (item) =>
                                                    <TagStatus status={item.active} />
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
                                                label: 'SELECCIONAR',
                                                width: '200px',
                                                pinRight: true,
                                                renderCell: (item) =>
                                                    <div className='d-flex gap-2 p-2'>
                                                        <Button
                                                            onClick={() => {
                                                                setShowFarms(false)
                                                                setActivePrp(item._id)
                                                            }}
                                                            variant='neutral-icon'
                                                            style={{ padding: '0.5rem' }}
                                                        >
                                                            <GiReceiveMoney size={16} />
                                                        </Button>
                                                        <Button
                                                            onClick={() => {
                                                                setShowFarms(false)
                                                            }}
                                                            variant='neutral-icon'
                                                            style={{ padding: '0.5rem' }}
                                                        >
                                                            <TbReportMoney size={16} />
                                                        </Button>
                                                    </div>
                                            }
                                        ]
                                    }
                                />
                        }
                    </div>
                </div>
            </Collapse>
            <div className='mt-2'>
                {
                    !!activePrp
                    &&
                    <FeeCollectBillPay prpId={activePrp} />
                }
            </div>
        </>
    )
}