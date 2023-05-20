import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Card, Form, ListGroup, Modal } from 'react-bootstrap'
import { IoMdClose } from 'react-icons/io'
import { useFieldArray, useForm } from 'react-hook-form'
import { DataTable, InputSearch, Liner } from '../../../components'
import { useAddCropMutation, useGetListCropByJuntaQuery } from '../../../store/actions'

export const JuntaCrops = () => {

    const { juntaid } = useParams()
    const [showCreateCrop, setShowCreateCrop] = useState(false)
    const [search, setSearch] = useState('')
    const { data: listCrops = [], isLoading } = useGetListCropByJuntaQuery({ junta: juntaid, search })

    return (
        <>
            <CropCreate show={showCreateCrop} setShow={setShowCreateCrop} juntaId={juntaid} />
            <Card style={{ overflow: 'hidden', backgroundColor: 'aliceblue' }}>
                <div className='d-flex flex-wrap align-items-center p-3 gap-2'>
                    <InputSearch className='m-0' value={search} onChange={(e) => setSearch(e)} loading={isLoading} />
                    <Button
                        onClick={() => setShowCreateCrop(true)}
                        variant='primary'
                    >
                        Nuevo cultivo
                    </Button>
                </div>
                <DataTable
                    rows={listCrops}
                    columns={
                        [
                            {
                                label: 'CULTIVO',
                                width: '200px',
                                renderCell: (item) => (
                                    item.name
                                )
                            },
                            {
                                label: 'TIPO',
                                width: '200px',
                                renderCell: (item) => (
                                    item.type
                                )
                            },
                            {
                                label: 'VARIEDADES',
                                renderCell: (item) =>
                                    item.varieties.length
                            },
                        ]
                    }
                />
            </Card>
        </>
    )
}

const CropCreate = ({ show = false, setShow = null, juntaId = '' }) => {

    const { control, register, handleSubmit, reset, watch, setValue, getValues } = useForm({
        defaultValues: {
            name: '',
            type: 0,
            varieties: [
                {
                    name: '',
                    period: 0,
                    crush: false,
                    monthlyVolume: {}
                }
            ]
        },
        mode: 'onChange'
    })
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'varieties',
        rules: {
            minLength: 1
        }
    })
    const [addCrop, { isLoading }] = useAddCropMutation()

    const handleSave = (data) => {
        addCrop({
            ...data,
            junta: juntaId
        }).unwrap().then(() => {
            reset({
                name: '',
                type: 0,
                varieties: [
                    {
                        name: '',
                        period: 0,
                        crush: false,
                        monthlyVolume: {}
                    }
                ]
            })
        })
    }

    const handleAddVariety = () => {
        append({
            name: '',
            period: 0,
            crush: false,
            monthlyVolume: {}
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
                    NUEVO CULTIVO
                </h5>
            </Modal.Header>
            <Modal.Body>
                <div className='container-flluid'>
                    <form id='form-ambit-junta-create-crop' onSubmit={handleSubmit(handleSave)}>
                        <Liner>Información</Liner>
                        <div className='row mb-2'>
                            <div className='col'>
                                <Form.Group controlId='newName'>
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        {...register('name', { required: true })}
                                        type='text'
                                        autoComplete='off'
                                    />
                                </Form.Group>
                            </div>
                            <div className='col'>
                                <Form.Group controlId='newType'>
                                    <Form.Label>Tipo de cultivo</Form.Label>
                                    <Form.Select
                                        {...register('type', { required: true })}
                                        autoComplete='off'
                                    >
                                        <option value={1}>Transitorio</option>
                                        <option value={2}>Permanente</option>
                                        <option value={3}>Semipermanente</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                        </div>
                        <Liner>Variedades</Liner>
                        <div className='row mb-1'>
                            <div className='col-12'>
                                <Button
                                    onClick={handleAddVariety}
                                    className='w-100'
                                    variant='success'
                                >Agregar variedad</Button>
                            </div>
                        </div>
                        {
                            fields.length > 0
                            &&
                            <div className='row'>
                                <div className='col-12'>
                                    <ListGroup>
                                        {
                                            fields.map((field, index) =>
                                                <ListGroup.Item key={`farmCrop_cllc_${index}`} className='border border-success'>
                                                    <div className='row mb-2'>
                                                        <div className='col-6'>
                                                            <Form.Group controlId={`newVariety`}>
                                                                <Form.Label>Nombre de la variedad</Form.Label>
                                                                <Form.Control
                                                                    {...register(`varieties.${index}.name`, { required: true })}
                                                                    type='text'
                                                                    autoComplete='off'
                                                                />
                                                            </Form.Group>
                                                        </div>
                                                        <div className='col-4'>
                                                            <Form.Group>
                                                                <Form.Label>Periodo (meses)</Form.Label>
                                                                <Form.Control
                                                                    {...register(`varieties.${index}.period`, { required: true, min: 1 })}
                                                                    type='number'
                                                                    min={1}
                                                                    max={12}
                                                                    autoComplete='off'
                                                                />
                                                            </Form.Group>
                                                        </div>
                                                        <div className='col-2'>
                                                            <Form.Group>
                                                                <Form.Label>Machaco</Form.Label>
                                                                <Form.Check
                                                                    {...register(`varieties.${index}.crush`, {
                                                                        onChange: () => {
                                                                            const monthlyVolume = getValues(`varieties.${index}.monthlyVolume`);
                                                                            setValue(`varieties.${index}.monthlyVolume`, {});

                                                                            [...Array(
                                                                                Number(watch(`varieties.${index}.period`)) + (Boolean(watch(`varieties.${index}.crush`)) ? 1 : 0)
                                                                            )].fill(undefined).forEach((_, indexVariety) => {
                                                                                setValue(`varieties.${index}.monthlyVolume.${indexVariety + (Boolean(watch(`varieties.${index}.crush`)) ? 0 : 1)}`, monthlyVolume[`${indexVariety + (Boolean(watch(`varieties.${index}.crush`)) ? 0 : 1)}`] || 0)
                                                                            })
                                                                        }
                                                                    })}
                                                                    type='checkbox'
                                                                    autoComplete='off'
                                                                    size={10}
                                                                />
                                                            </Form.Group>
                                                        </div>
                                                    </div>
                                                    <div className='row mb-2'>
                                                        {
                                                            [...Array(
                                                                Number(watch(`varieties.${index}.period`)) + (Boolean(watch(`varieties.${index}.crush`)) ? 1 : 0)
                                                            )].fill(undefined).map((_, indexVariety) => {
                                                                return (
                                                                    <div key={`varieties.${index}.volume.${indexVariety + (Boolean(watch(`varieties.${index}.crush`)) ? 0 : 1)}`} className='col-4'>
                                                                        <Form.Group className='mb-2'>
                                                                            <Form.Label>
                                                                                Volumen ({
                                                                                    Boolean(watch(`varieties.${index}.crush`)) && indexVariety === 0 ? 'Machaco' : `Mes ${indexVariety + (Boolean(watch(`varieties.${index}.crush`)) ? 0 : 1)}`
                                                                                })
                                                                            </Form.Label>
                                                                            <Form.Control
                                                                                {...register(`varieties.${index}.monthlyVolume.${indexVariety + (Boolean(watch(`varieties.${index}.crush`)) ? 0 : 1)}`, { required: true, valueAsNumber: true, min: 1 })}
                                                                                type='number'
                                                                                min={0}
                                                                                autoComplete='off'
                                                                            />
                                                                        </Form.Group>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    {
                                                        index > 0
                                                        &&
                                                        <div className='row'>
                                                            <div className='col-auto'>
                                                                <Button onClick={() => remove(index)} variant='danger'>
                                                                    <IoMdClose size={20} />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    }
                                                </ListGroup.Item>
                                            )
                                        }
                                    </ListGroup>
                                </div>
                            </div>
                        }
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
                    form='form-ambit-junta-create-crop'
                    variant='primary'
                    disabled={isLoading}
                >
                    Grabar nuevo
                </Button>
            </Modal.Footer>
        </Modal>
    )
}