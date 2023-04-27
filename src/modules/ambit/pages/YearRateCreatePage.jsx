import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useNavigateState } from '../../../hooks'
import { Liner } from '../../../components'
import { useAddYearRateMutation } from '../../../store/actions'

export const YearRateCreatePage = () => {

    const { state: params } = useLocation()
    const [redirect, redirectEscape] = useNavigateState('/app/ambit/orgz/junta')

    const [addYearRate, { isLoading: isSavingAdd, isSuccess: isSaved }] = useAddYearRateMutation()
    const { register, handleSubmit, reset, getValues } = useForm()

    const handleSave = async (newData) => {
        try {
            await addYearRate({
                ...newData,
                junta: params?.junta?._id
            })
        } catch (err) {
            console.log(err)
        }
    }

    const handleDiscard = () => {
        redirect()
    }

    useEffect(() => {
        if (isSaved) {
            reset({})
        }
    }, [isSaved])

    return (
        <div className='container-fluid'>
            <div className='row my-3'>
                <div className='col-12'>
                    <div className='row align-items-center justify-content-between g-3'>
                        <div className='col-12 col-md-auto'>
                            <h4 className='mb-0'>NUEVO PERIODO - CAMPAÑA</h4>
                        </div>
                        <div className='col-12 col-md-auto'>
                            <div className='d-flex gap-2'>
                                <Button
                                    onClick={handleDiscard}
                                    disabled={isSavingAdd}
                                    variant='secondary'
                                    type='button'
                                >
                                    Descartar
                                </Button>
                                <Button
                                    disabled={isSavingAdd}
                                    variant='primary'
                                    type='submit'
                                    form='form-ambit-junta-create-yearrate'
                                >
                                    Registro nuevo
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row g-0 justify-content-center'>
                <div className='col'>
                    <form id='form-ambit-junta-create-yearrate' onSubmit={handleSubmit(handleSave)}>
                        <Liner>Periodo</Liner>
                        <div className='row'>
                            <div className='col-12 col-md-6 col-lg-2'>
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
                            <div className='col-12 col-md-6 col-lg-2'>
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
                            <div className='col-12 col-md-6 col-lg-2'>
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
                            <div className='col-12 col-md-6 col-lg-2'>
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
                            <div className='col-12 col-md-6 col-lg-2'>
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
            </div>
        </div>
    )
}
