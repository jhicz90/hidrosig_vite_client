import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Card, Form, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { DataTable, InputSearch, Liner, TagStatus } from '../../../components'
import { useAddCompMutation, useGetListCompByJuntaQuery } from '../../../store/actions'

export const JuntaComponents = () => {

    const { juntaid } = useParams()
    const [showCreateComponent, setShowCreateComponent] = useState(false)
    const [search, setSearch] = useState('')
    const { data: listComp = [], isLoading } = useGetListCompByJuntaQuery({ junta: juntaid, search })

    return (
        <>
            <ComponentCreate show={showCreateComponent} setShow={setShowCreateComponent} juntaId={juntaid} />
            <Card style={{ overflow: 'hidden', backgroundColor: 'aliceblue' }}>
                <div className='d-flex flex-wrap align-items-center p-3 gap-2'>
                    <InputSearch className='m-0' value={search} onChange={(e) => setSearch(e)} loading={isLoading} />
                    <Button
                        onClick={() => setShowCreateComponent(true)}
                        variant='primary'
                    >
                        Nuevo componente
                    </Button>
                </div>
                <DataTable
                    rows={listComp}
                    columns={
                        [
                            {
                                label: 'ORDEN',
                                width: '100px',
                                renderCell: (item) => (
                                    item.order
                                )
                            },
                            {
                                label: 'COMPONENTE',
                                renderCell: (item) => (
                                    item.name
                                )
                            },
                            {
                                label: 'ABREVIATURA',
                                renderCell: (item) =>
                                    item.nameAbrev
                            },
                            {
                                label: 'GRUPO',
                                renderCell: (item) =>
                                    item.group
                            },
                            {
                                label: 'VISTA',
                                renderCell: (item) =>
                                    <TagStatus status={item.view} />
                            },
                        ]
                    }
                />
            </Card>
        </>
    )
}

const ComponentCreate = ({ show = false, setShow = null, juntaId = '' }) => {

    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            name: '',
            nameAbrev: '',
            group: '',
            order: 0,
            view: true
        }
    })
    const [addComponent, { isLoading }] = useAddCompMutation()

    const handleSave = (data) => {
        addComponent({
            ...data,
            junta: juntaId
        }).unwrap().then(() => {
            reset({
                name: '',
                nameAbrev: '',
                group: '',
                order: 0,
                view: true
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
                    NUEVO COMPONENTE
                </h5>
            </Modal.Header>
            <Modal.Body>
                <div className='container-flluid'>
                    <form id='form-ambit-junta-create-component' onSubmit={handleSubmit(handleSave)}>
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
                                <Form.Group controlId='newNameAbrev'>
                                    <Form.Label>Nombre abreviatura</Form.Label>
                                    <Form.Control
                                        {...register('nameAbrev', { required: true })}
                                        type='text'
                                        autoComplete='off'
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <Liner>Grupo y vista</Liner>
                        <div className='row mb-2'>
                            <div className='col-12 col-md-6'>
                                <Form.Group controlId='newGroup'>
                                    <Form.Label>Nombre del grupo</Form.Label>
                                    <Form.Control
                                        {...register('group', { required: true })}
                                        type='text'
                                        autoComplete='off'
                                    />
                                </Form.Group>
                            </div>
                            <div className='col-6 col-md-3'>
                                <Form.Group controlId='newOrder'>
                                    <Form.Label>Número de orden</Form.Label>
                                    <Form.Control
                                        {...register('order', { required: true })}
                                        type='number'
                                        min={1}
                                        autoComplete='off'
                                    />
                                </Form.Group>
                            </div>
                            <div className='col-6 col-md-3'>
                                <Form.Group controlId='newView'>
                                    <Form.Label>Vista del componente</Form.Label>
                                    <Form.Check
                                        {...register('view')}
                                        type='checkbox'
                                        autoComplete='off'
                                        size={10}
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
                    form='form-ambit-junta-create-component'
                    variant='primary'
                    disabled={isLoading}
                >
                    Grabar nuevo
                </Button>
            </Modal.Footer>
        </Modal>
    )
}