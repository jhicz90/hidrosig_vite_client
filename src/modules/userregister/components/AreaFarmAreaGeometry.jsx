import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { Card, Form } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import { LocationMap, OptionGeometry } from '../../../components'
import { farmApi, searchGeoObject, searchPolygonObject, useUpdateFarmByIdMutation } from '../../../store/actions'

export const AreaFarmAreaGeometry = () => {

    const { prpid } = useParams()
    const { data = null } = useSelector(farmApi.endpoints.getFarmById.select(prpid))
    const [updateFarm, { isLoading: isUpdating }] = useUpdateFarmByIdMutation()
    const { register, watch, control, handleSubmit, reset } = useForm()

    const handleUpdate = ({ feature }) => {
        updateFarm({
            id: prpid,
            farm: { feature }
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
                <form id='form-userregister-areafarm-edit-geometry' onSubmit={handleSubmit(handleUpdate)}>
                    <div className='row'>
                        <div className='col-12'>
                            <Form.Group className='mb-3' controlId='pFeature'>
                                <Form.Label>Área geográfica</Form.Label>
                                <Controller
                                    name='feature'
                                    control={control}
                                    render={({ field }) =>
                                        <AsyncSelect
                                            {...field}
                                            inputId='pFeature'
                                            classNamePrefix='rc-select'
                                            styles={{
                                                control: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    minHeight: '90px',
                                                }),
                                            }}
                                            isClearable
                                            defaultOptions
                                            cacheOptions
                                            loadOptions={searchPolygonObject}
                                            menuPlacement={'auto'}
                                            placeholder={`Buscar...`}
                                            loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                            noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                            getOptionValue={e => e._id}
                                            getOptionLabel={e => <OptionGeometry geo={e} />}
                                        />
                                    }
                                />
                            </Form.Group>
                        </div>
                    </div>
                    {
                        !!watch('feature')
                        &&
                        <LocationMap data={watch('feature') || []} />
                    }
                </form>
            </Card.Body>
        </Card>
    )
}
