import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import { startUpdateLevelOccupation, searchJunta, searchCommitteeByJunta } from '../../../store/actions'
import { ListGroupOption, ListGroupOptionItem } from '../../../components'
import { imageGet } from '../../../helpers'

export const OccupationModuleLevel = () => {

    const { lvlAccess } = useSelector(state => state.auth)
    const { active, isSaving } = useSelector(state => state.occupation)
    const { register, control, watch, setValue, handleSubmit, reset } = useForm({
        mode: 'onChange'
    })

    const handleSave = ({ levelOccupation, junta, committee }) => {
        startUpdateLevelOccupation({
            levelOccupation,
            junta,
            committee
        })
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
                        <div className='col-12'>
                            <ListGroupOption>
                                {
                                    [
                                        { name: 'Administrador', desc: 'La ocupación solo la verá los que tengan el mismo nivel', value: 1 },
                                        { name: 'Junta de usuarios', desc: 'Esta ocupación se verá en su ámbito y sus comisiones respectivas', value: 2 },
                                        { name: 'Comisión de usuarios', desc: 'Esta ocupación solo podra acceder dentro de su ámbito', value: 3 }
                                    ].map(
                                        (option) =>
                                            lvlAccess <= option.value && (
                                                <ListGroupOptionItem
                                                    {...register('levelOccupation', {
                                                        setValueAs: v => String(v),
                                                        onChange: () => {
                                                            setValue('junta', null)
                                                            setValue('committee', null)
                                                        }
                                                    })}
                                                    key={`check-${option.name}`}
                                                    labelTitle={option.name}
                                                    labelDesc={option.desc}
                                                    valueOption={option.value}
                                                />
                                            )
                                    )
                                }
                            </ListGroupOption>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className='mb-3'>
                                <label htmlFor='junta' className='form-label'>Junta de usuarios</label>
                                <Controller
                                    name='junta'
                                    control={control}
                                    rules={{ required: watch().levelOccupation > 1 }}
                                    render={
                                        ({ field }) =>
                                            <AsyncSelect
                                                {...field}
                                                inputId='junta'
                                                classNamePrefix='rc-select'
                                                isClearable
                                                defaultOptions
                                                isDisabled={watch().levelOccupation < 2 || lvlAccess > 1}
                                                loadOptions={searchJunta}
                                                menuPlacement={'auto'}
                                                placeholder={`Buscar...`}
                                                loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                noOptionsMessage={({ inputValue }) => `Sin resultados con '${inputValue}'`}
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
                                <label htmlFor='committee' className='form-label'>Comisiones</label>
                                <Controller
                                    name='committee'
                                    control={control}
                                    rules={{ required: watch().levelOccupation === 3 }}
                                    render={
                                        ({ field }) =>
                                            <AsyncSelect
                                                {...field}
                                                inputId='committee'
                                                classNamePrefix='rc-select'
                                                isClearable
                                                defaultOptions
                                                isDisabled={watch().levelOccupation < 3}
                                                loadOptions={async (e) => {
                                                    return await searchCommitteeByJunta(watch().junta._id, e)
                                                }}
                                                menuPlacement={'auto'}
                                                placeholder={`Buscar...`}
                                                loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                noOptionsMessage={({ inputValue }) => `Sin resultados con '${inputValue}'`}
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
                    <div className='d-flex justify-content-end gap-2'>
                        <Button
                            disabled={isSaving}
                            variant={'primary'}
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
