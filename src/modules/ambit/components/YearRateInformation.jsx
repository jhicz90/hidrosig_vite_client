import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Button, Card, Form } from 'react-bootstrap'
import { Liner } from '../../../components'
import { useUpdateYearRateByIdMutation, yearrateApi } from '../../../store/actions'

export const YearRateInformation = () => {

    const { yrtid } = useParams()
    const { data = null } = useSelector(yearrateApi.endpoints.getYearRateById.select(yrtid))
    const [updateYearRate, { isLoading: isSaving }] = useUpdateYearRateByIdMutation()
    const { register, handleSubmit, getValues, reset } = useForm()

    const handleUpdate = ({ year, monthStart, monthEnd, campaign, interest, nameYear }) => {
        updateYearRate({
            id: yrtid,
            yearrate: { year, monthStart, monthEnd, campaign, interest, nameYear }
        })
    }

    useEffect(() => {
        reset({
            ...data
        })
    }, [reset, data])

    return (
        <Card>
            <Card.Body>
                <form id='form-ambit-junta-yearrate-info' onSubmit={handleSubmit(handleUpdate)}>
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
                    <div className='d-flex justify-content-end gap-2'>
                        <Button
                            disabled={isSaving}
                            variant='primary'
                            type='submit'
                        >
                            Guardar cambios
                        </Button>
                    </div>
                </form>
            </Card.Body>
        </Card>
    )
}
