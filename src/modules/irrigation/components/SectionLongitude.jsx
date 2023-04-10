import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button, Card, Form } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import { MapLocation, OptionGeometry } from '../../../components'
import { searchLineStringObject, sectionApi, useUpdateSectionByIdMutation } from '../../../store/actions'

export const SectionLongitude = () => {

    const { sectid } = useParams()
    const { data = null } = useSelector(sectionApi.endpoints.getSectionById.select(sectid))
    const [updateSection, { isLoading: isUpdating }] = useUpdateSectionByIdMutation()
    const { watch, control, handleSubmit, reset } = useForm()

    const handleUpdate = ({ feature, structure }) => {
        updateSection({
            id: sectid,
            section: { feature, structure }
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
                <form id='form-irrigation-section-longitude' onSubmit={handleSubmit(handleUpdate)}>
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
                                                    minHeight: '150px',
                                                }),
                                            }}
                                            isClearable
                                            defaultOptions
                                            cacheOptions
                                            loadOptions={searchLineStringObject}
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
                        <MapLocation
                            geometry={
                                [
                                    {
                                        type: 'Feature',
                                        ...watch('feature').geometry
                                    }
                                ]
                            }
                            view={watch('feature')?.view || {}}
                        />
                    }
                    <div className='d-flex justify-content-end gap-2'>
                        <Button
                            disabled={isUpdating}
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
