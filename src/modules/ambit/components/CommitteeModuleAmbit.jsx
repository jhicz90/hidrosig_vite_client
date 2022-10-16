import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Form } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import { searchJunta, searchZoneByJunta, startUpdateAmbitCommittee } from '../../../store/actions'
import { imageGet } from '../../../helpers'

export const CommitteeModuleAmbit = () => {

    const dispatch = useDispatch()
    const { active, isSaving } = useSelector(state => state.committee)
    const { control, watch, setValue, handleSubmit, reset } = useForm({
        mode: 'onChange'
    })

    const handleSave = ({ junta, zone }) => {
        dispatch(startUpdateAmbitCommittee({
            junta: junta ? junta._id : null,
            zone: zone ? zone._id : null,
        }))
    }

    useEffect(() => {
        reset({
            ...active
        })
    }, [reset, active])

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
                                                getOptionLabel={e =>
                                                    <div className='d-flex'>
                                                        <img src={imageGet(e.image)} alt={e._id} width={32} />
                                                        <span className='ms-2 align-self-center'>{e.name}</span>
                                                    </div>
                                                }
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