import React, { useState, useEffect } from 'react'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { OffCanvasFooterStyled } from '../../../style'
import { Liner, LoadingPage } from '../../../components'
import { useAddSocialReasonMutation, useLazyNewSocialReasonQuery } from '../../../store/actions'

export const SocialReasonCreate = ({ message = 'Nueva Razón social' }) => {

    const [show, setShow] = useState(false)

    const [newSocialReason, { data = null, isLoading }] = useLazyNewSocialReasonQuery()
    const [addSocialReason, { isLoading: isSavingAdd }] = useAddSocialReasonMutation()

    const { register, handleSubmit, reset } = useForm()

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleSave = (newData) => {
        addSocialReason(newData).unwrap()
            .then(() => newSocialReason())
    }

    useEffect(() => {
        newSocialReason()
    }, [show])

    useEffect(() => {
        reset({
            ...data
        })
    }, [reset, data])

    return (
        <React.Fragment>
            <a
                href='#'
                onClick={(e) => {
                    e.preventDefault()
                    handleShow()
                }}
            >
                {message}
            </a>
            <Offcanvas
                show={show}
                onHide={handleClose}
                placement='end'
            >
                <Offcanvas.Header closeButton closeVariant='white'>
                    <div className='d-flex flex-column'>
                        <Offcanvas.Title>Razón social #NUEVO</Offcanvas.Title>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {
                        isLoading
                            ?
                            <LoadingPage />
                            :
                            <form
                                id='form-accounting-socialreason-voucher-create'
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    handleSubmit(handleSave)(e)
                                }}
                            >
                                <Liner>Información</Liner>
                                <div className='row'>
                                    <div className='col-12'>
                                        <Form.Group className='mb-3'>
                                            <Form.Label>Documento de identidad o RUC</Form.Label>
                                            <Form.Control
                                                {...register('idSocialReason', { required: true, minLength: 8 })}
                                                type='text'
                                                minLength={8}
                                                autoComplete='off'
                                            />
                                            <Form.Text muted>Ingrese el DNI de la persona o el RUC de la empresa.</Form.Text>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-12'>
                                        <Form.Group className='mb-3'>
                                            <Form.Label>Persona o Razón social</Form.Label>
                                            <Form.Control
                                                {...register('nameSocialReason', { required: true, minLength: 4 })}
                                                type='text'
                                                minLength={4}
                                                autoComplete='off'
                                            />
                                            <Form.Text muted>Ingrese si es posible el nombre completo de la persona o la empresa.</Form.Text>
                                        </Form.Group>
                                    </div>
                                </div>
                            </form>
                    }
                </Offcanvas.Body>
                <OffCanvasFooterStyled>
                    <Button
                        disabled={isSavingAdd}
                        onClick={handleClose}
                        type='button'
                        variant='neutral'
                    >
                        Cancelar
                    </Button>
                    <Button
                        disabled={isSavingAdd}
                        type='submit'
                        form='form-accounting-socialreason-voucher-create'
                        variant='primary'
                    >
                        Guardar
                    </Button>
                </OffCanvasFooterStyled>
            </Offcanvas>
        </React.Fragment>
    )
}
