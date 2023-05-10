import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Form, Modal } from 'react-bootstrap'
import { FaCheck, FaLock, FaMinusCircle } from 'react-icons/fa'
import { IoEyeSharp } from 'react-icons/io5'
import { useForm } from 'react-hook-form'
import moment from 'moment'
import { TagOpened } from '..'
import { DataTable, InputSearch, Liner, LinkBack, TagStatus } from '../../../components'
import { activeCampaignByIds, closeCampaignByIds, inactiveCampaignByIds, juntaApi, useAddYearRateMutation, useGetListYearRateByJuntaQuery } from '../../../store/actions'

export const JuntaYearRate = () => {

    const dispatch = useDispatch()
    const { juntaid } = useParams()
    const [showCreateYearRate, setShowCreateYearRate] = useState(false)
    const [search, setSearch] = useState('')
    const [selected, setSelected] = useState([])
    const { data = null } = useSelector(juntaApi.endpoints.getJuntaById.select(juntaid))
    const { data: yearsrateIn = [], isLoading } = useGetListYearRateByJuntaQuery({ junta: data?._id, search }, { skip: !data })

    const handleCloseCampaign = () => {
        dispatch(closeCampaignByIds(selected))
    }

    const handleActiveCampaign = () => {
        dispatch(activeCampaignByIds(selected))
    }

    const handleInactiveCampaign = () => {
        dispatch(inactiveCampaignByIds(selected))
    }

    return (
        <>
            <YearRateCreate show={showCreateYearRate} setShow={setShowCreateYearRate} junta={data} />
            <Card style={{ overflow: 'hidden', backgroundColor: 'aliceblue' }}>
                <div className='d-flex flex-wrap align-items-center p-3 gap-2'>
                    <InputSearch className='m-0' value={search} onChange={(e) => setSearch(e)} loading={isLoading} />
                    <Button
                        onClick={() => setShowCreateYearRate(true)}
                        variant='primary'
                    >
                        Nuevo periodo
                    </Button>
                    {
                        selected.length > 0
                        &&
                        <>
                            <Button
                                onClick={handleCloseCampaign}
                                variant='secondary'
                            >
                                <FaLock className='me-1' />
                                Cerrar {selected.length === yearsrateIn.length ? 'todas las' : selected.length} campaña{selected.length > 1 ? 's' : ''}
                            </Button>
                            <Button
                                onClick={handleActiveCampaign}
                                variant='success'
                            >
                                <FaCheck className='me-1' />
                                Habilitar {selected.length === yearsrateIn.length ? 'todas las' : selected.length} campaña{selected.length > 1 ? 's' : ''}
                            </Button>
                            <Button
                                onClick={handleInactiveCampaign}
                                variant='warning'
                            >
                                <FaMinusCircle className='me-1' />
                                Desabilitar {selected.length === yearsrateIn.length ? 'todas las' : selected.length} campaña{selected.length > 1 ? 's' : ''}
                            </Button>
                        </>
                    }
                </div>
                <DataTable
                    selected={true}
                    selectedChange={(data) => setSelected(data)}
                    rows={yearsrateIn}
                    columns={
                        [
                            {
                                label: 'AÑO - CAMPAÑA',
                                resize: true,
                                renderCell: (item) => (
                                    <div>{`${item.year} - ${item.campaign === 1 ? 'CHICA - I' : 'GRANDE - II'}`}</div>
                                )
                            },
                            {
                                label: 'PERIODO',
                                renderCell: (item) =>
                                    <div>{`${moment().month(item.monthStart - 1).format('MMMM').toUpperCase()} - ${moment().month(item.monthEnd - 1).format('MMMM').toUpperCase()}`}</div>
                            },
                            {
                                label: 'APERTURADO',
                                renderCell: (item) =>
                                    <TagOpened yearRateId={item._id} opened={item.opened} />
                            },
                            {
                                label: 'ESTADO',
                                renderCell: (item) =>
                                    <TagStatus status={item.active} />
                            },
                            {
                                label: 'ACCIÓN',
                                pinRight: true,
                                renderCell: (item) =>
                                    <div className='d-flex gap-2 p-2'>
                                        <LinkBack
                                            to={`/app/ambit/orgz/yr/${item._id}`}
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
            </Card>
        </>
    )
}

const YearRateCreate = ({ show = false, setShow = null, junta = null }) => {

    const { _id: juntaId } = junta
    const { register, handleSubmit, reset, getValues } = useForm({
        defaultValues: {
            year: 0,
            monthStart: 0,
            monthEnd: 0,
            campaign: 1,
            interest: 0,
            nameYear: ''
        }
    })
    const [addYearRate, { isLoading }] = useAddYearRateMutation()

    const handleSave = (data) => {
        addYearRate({
            ...data,
            junta: juntaId
        }).unwrap().then(() => {
            reset({
                year: 0,
                monthStart: 0,
                monthEnd: 0,
                campaign: 1,
                interest: 0,
                nameYear: ''
            })
        })
    }

    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            size='lg'
            fullscreen='md-down'
            backdrop='static'
        >
            <Modal.Header>
                <h5 className='mb-0'>
                    NUEVO PERIODO - CAMPAÑA
                </h5>
            </Modal.Header>
            <Modal.Body>
                <div className='container-flluid'>
                    <form id='form-ambit-junta-create-yearrate' onSubmit={handleSubmit(handleSave)}>
                        <Liner>Periodo</Liner>
                        <div className='row'>
                            <div className='col-12 col-lg-4'>
                                <Form.Group className='mb-3' controlId='newYear'>
                                    <Form.Label>Año</Form.Label>
                                    <Form.Control
                                        {...register('year', { required: true })}
                                        type='number'
                                        min={0}
                                        autoComplete='off'
                                    />
                                </Form.Group>
                            </div>
                            <div className='col-12 col-lg-4'>
                                <Form.Group className='mb-3' controlId='newMonthStart'>
                                    <Form.Label>Mes inicio</Form.Label>
                                    <Form.Control
                                        {...register('monthStart', { required: true })}
                                        type='number'
                                        min={1}
                                        max={12}
                                        autoComplete='off'
                                    />
                                </Form.Group>
                            </div>
                            <div className='col-12 col-lg-4'>
                                <Form.Group className='mb-3' controlId='newMonthEnd'>
                                    <Form.Label>Mes final</Form.Label>
                                    <Form.Control
                                        {...register('monthEnd', {
                                            required: true,
                                            validate: {
                                                verifyMonth: (value) => {
                                                    return Number(getValues('monthStart')) < value || 'El mes de inicio tiene que ser menor que el mes final'
                                                }
                                            }
                                        })}
                                        type='number'
                                        min={1}
                                        max={12}
                                        autoComplete='off'
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <Liner>Campaña</Liner>
                        <div className='row'>
                            <div className='col-12 col-lg-6'>
                                <Form.Group className='mb-3' controlId='newCampaign'>
                                    <Form.Label>Campaña</Form.Label>
                                    <Form.Select
                                        {...register('campaign', { required: true })}
                                        autoComplete='off'
                                    >
                                        <option value={1}>CHICA I</option>
                                        <option value={2}>GRANDE II</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                            <div className='col-12 col-lg-6'>
                                <Form.Group className='mb-3' controlId='newInterest'>
                                    <Form.Label>Interes</Form.Label>
                                    <Form.Control
                                        {...register('interest', { required: true })}
                                        type='number'
                                        min={0}
                                        step={0.01}
                                        autoComplete='off'
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12'>
                                <Form.Group className='mb-3' controlId='newnameYear'>
                                    <Form.Label>Nombre del año</Form.Label>
                                    <Form.Control
                                        {...register('nameYear')}
                                        type='text'
                                        autoComplete='off'
                                    />
                                </Form.Group>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={() => setShow(false)}
                    type='button'
                    variant='secondary'
                    disabled={isLoading}
                >
                    Cerrar
                </Button>
                <Button
                    type='submit'
                    form='form-ambit-junta-create-yearrate'
                    variant='primary'
                    disabled={isLoading}
                >
                    Grabar nuevo
                </Button>
            </Modal.Footer>
        </Modal>
    )
}