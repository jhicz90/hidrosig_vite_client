import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button, Card, Form } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import { committeeApi, searchJunta, searchZoneByJunta, useUpdateCommByIdMutation } from '../../../store/actions'
import { OptionOrgz } from '../../../components'

export const CommitteeAmbit = () => {
    
    const { commid } = useParams()
    const { data = null } = useSelector(committeeApi.endpoints.getCommById.select(commid))
    const [updateComm, { isLoading: isSaving }] = useUpdateCommByIdMutation()
    const { control, watch, setValue, handleSubmit, reset } = useForm()

    const handleSave = ({ junta, zone }) => {
        updateComm({
            junta: junta ? junta._id : null,
            zone: zone ? zone._id : null,
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
                <form onSubmit={handleSubmit(handleSave)}>
                    <div className='row'>
                        <div className='col'>
                            <div className='mb-3'>
                                <label htmlFor='uJunta' className='form-label'>Junta de usuarios</label>
                                <Controller
                                    name='junta'
                                    control={control}
                                    rules={{
                                        required: true,
                                        onChange: () => {
                                            setValue('zone', null)
                                        }
                                    }}
                                    render={
                                        ({ field }) =>
                                            <AsyncSelect
                                                {...field}
                                                inputId='uJunta'
                                                classNamePrefix='rc-select'
                                                isClearable
                                                defaultOptions
                                                loadOptions={searchJunta}
                                                menuPlacement={'auto'}
                                                placeholder={`Buscar...`}
                                                loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                getOptionValue={e => e._id}
                                                getOptionLabel={e => <OptionOrgz orgz={e} />}
                                            />
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className='mb-3'>
                                <label htmlFor='uZone' className='form-label'>Zona</label>
                                <Controller
                                    name='zone'
                                    control={control}
                                    rules={{ required: true }}
                                    render={
                                        ({ field }) =>
                                            <AsyncSelect
                                                {...field}
                                                inputId='uZone'
                                                classNamePrefix='rc-select'
                                                isClearable
                                                loadOptions={async (e) => {
                                                    return await searchZoneByJunta(watch().junta._id, e)
                                                }}
                                                menuPlacement={'auto'}
                                                placeholder={`Buscar...`}
                                                loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                getOptionValue={e => e._id}
                                                getOptionLabel={e => e.name}
                                            />
                                    }
                                />
                                <Form.Text muted>
                                    Area o zonas que conforma el ámbito de la junta de usuarios.
                                </Form.Text>
                            </div>
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