import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import { Button, Form } from 'react-bootstrap'
import { ListGroupOption, ListGroupOptionItem } from '../../../components'
import { editActiveNewOccupation, startSaveNewOccupation } from '../../../store/occupation'
import { searchJunta } from '../../../store/junta'
import { searchCommitteeByJunta } from '../../../store/committee'
import { imageGet } from '../../../helpers'

export const CreateOccupationStep1 = ({ setStep }) => {

    const dispatch = useDispatch()
    const { activeNew } = useSelector(state => state.occupation)
    const { register, handleSubmit, reset } = useForm()

    const handleNext = ({ name, desc }) => {
        dispatch(editActiveNewOccupation({
            name,
            desc
        }))
        setStep(2)
    }

    useEffect(() => {
        reset({
            ...activeNew
        })
    }, [reset, activeNew])

    return (
        <form onSubmit={handleSubmit(handleNext)}>
            <div className='row'>
                <div className='col-12'>
                    <Form.Group className='mb-3' controlId='uName'>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            {...register('name', { required: true })}
                            type='text'
                            autoComplete='off'
                        />
                    </Form.Group>
                </div>
                <div className='col-12'>
                    <Form.Group className='mb-3' controlId='uDesc'>
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            {...register('desc')}
                            as='textarea'
                            type={'text'}
                            autoComplete='off'
                        />
                    </Form.Group>
                </div>
            </div>
            <div className='d-flex justify-content-end gap-2'>
                <Button
                    variant='primary'
                    type='submit'
                >
                    Siguiente
                </Button>
            </div>
        </form>
    )
}

export const CreateOccupationStep2 = ({ setStep }) => {

    const dispatch = useDispatch()
    const { lvlAccess } = useSelector(state => state.auth)
    const { activeNew, isSavingNew } = useSelector(state => state.occupation)
    const { register, control, watch, setValue, handleSubmit, reset } = useForm({
        mode: 'onChange'
    })

    const handleNext = ({ levelOccupation, junta, committee }) => {
        dispatch(editActiveNewOccupation({
            levelOccupation,
            junta,
            committee
        }))
        dispatch(startSaveNewOccupation())
    }

    useEffect(() => {
        reset({
            ...activeNew
        })
    }, [reset, activeNew])

    return (
        <form onSubmit={handleSubmit(handleNext)}>
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
                    onClick={() => setStep(2)}
                    disabled={isSavingNew}
                    variant='primary'
                >
                    Volver
                </Button>
                <Button
                    disabled={isSavingNew}
                    variant='primary'
                    type='submit'
                >
                    Grabar
                </Button>
            </div>
        </form>
    )
}