import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import { useWizard } from 'react-use-wizard'
import { setActiveNewRole, startAddNewRole, editActiveNewRole, startSaveNewRole, searchJunta, searchCommitteeByJunta } from '../../../store/actions'
import { ListGroupOption, ListGroupOptionItem, OptionOrgz, WizardStep } from '../../../components'

export const CreateRole = ({ className = '', children }) => {

    const dispatch = useDispatch()
    const { activeNew, isSavingNew } = useSelector(state => state.role)

    useEffect(() => {
        return () => dispatch(setActiveNewRole(null))
    }, [dispatch])

    return (
        <>
            <button
                disabled={isSavingNew}
                className={className === '' ? 'btn btn-neutral text-primary text-decoration-none' : className}
                onClick={() => dispatch(startAddNewRole())}
            >
                {children || 'Nuevo rol de usuario'}
            </button>
            <Offcanvas
                show={!!activeNew}
                onHide={() => dispatch(setActiveNewRole(null))}
                placement='end'
            >
                <Offcanvas.Header closeButton={!isSavingNew} closeVariant='white'>
                    <Offcanvas.Title>Crear rol de usuario</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <WizardStep>
                        <CreateRoleStep1 />
                        <CreateRoleStep2 />
                    </WizardStep>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export const CreateRoleStep1 = () => {

    const { nextStep } = useWizard()
    const dispatch = useDispatch()
    const { activeNew } = useSelector(state => state.role)
    const { register, handleSubmit, reset } = useForm()

    const handleNext = ({ name, desc }) => {
        dispatch(editActiveNewRole({
            name,
            desc
        }))
        nextStep()
    }

    useEffect(() => {
        reset({
            ...activeNew
        })
    }, [reset, activeNew])

    return (
        <>
            <form id='form-system-role-create-1' onSubmit={handleSubmit(handleNext)}>
                <div className='row'>
                    <div className='col-12'>
                        <Form.Group className='mb-3' controlId='newName'>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                {...register('name', { required: true })}
                                type='text'
                                autoComplete='off'
                            />
                        </Form.Group>
                    </div>
                    <div className='col-12'>
                        <Form.Group className='mb-3' controlId='newDesc'>
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
                <div className='d-flex justify-content-end gap-2 w-100'>
                    <Button
                        variant='outline-primary'
                        type='submit'
                        className='w-100'
                    >
                        Siguiente
                    </Button>
                </div>
            </form>
        </>
    )
}

export const CreateRoleStep2 = () => {

    const { previousStep } = useWizard()
    const dispatch = useDispatch()
    const { lvlAccess } = useSelector(state => state.auth)
    const { activeNew, isSavingNew } = useSelector(state => state.role)
    const { register, control, watch, setValue, handleSubmit, reset } = useForm()

    const handleNext = ({ levelRole, junta, committee }) => {
        dispatch(editActiveNewRole({
            levelRole,
            junta,
            committee
        }))
        dispatch(startSaveNewRole())
    }

    useEffect(() => {
        reset({
            ...activeNew
        })
    }, [reset, activeNew])

    return (
        <form id='form-system-role-create-2' onSubmit={handleSubmit(handleNext)}>
            <div className='row'>
                <div className='col-12'>
                    <ListGroupOption>
                        {
                            [
                                { name: 'Administrador', desc: 'El rol de usuario solo se verá para los que tengan el mismo nivel, y este es el nivel más alto y poder ende se accede a todo el sistema', value: 1 },
                                { name: 'Junta de usuarios', desc: 'Este rol de usuario se verá en su ámbito y sus comisiones respectivas', value: 2 },
                                { name: 'Comisión de usuarios', desc: 'Este rol solo podra acceder dentro de su ámbito', value: 3 }
                            ].map(
                                (option) =>
                                    lvlAccess <= option.value && (
                                        <ListGroupOptionItem
                                            {...register('levelRole', {
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
                    <Form.Group className='mb-3' controlId='newJunta'>
                        <Form.Label>Junta de usuarios</Form.Label>
                        <Controller
                            name='junta'
                            control={control}
                            rules={{
                                required: watch().levelRole > 1,
                                onChange: () => {
                                    setValue('committee', null)
                                }
                            }}
                            render={
                                ({ field }) =>
                                    <AsyncSelect
                                        {...field}
                                        inputId='newJunta'
                                        classNamePrefix='rc-select'
                                        isClearable
                                        defaultOptions
                                        isDisabled={watch().levelRole < 2 || lvlAccess > 1}
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
                    </Form.Group>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <Form.Group className='mb-3' controlId='newCommittee'>
                        <Form.Label>Comisiones</Form.Label>
                        <Controller
                            name='committee'
                            control={control}
                            rules={{ required: watch().levelRole === 3 }}
                            render={
                                ({ field }) =>
                                    <AsyncSelect
                                        {...field}
                                        inputId='committee'
                                        classNamePrefix='rc-select'
                                        isClearable
                                        defaultOptions
                                        isDisabled={watch().levelRole < 3}
                                        loadOptions={async (e) => {
                                            return await searchCommitteeByJunta(watch().junta._id, e)
                                        }}
                                        menuPlacement={'auto'}
                                        placeholder={`Buscar...`}
                                        loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                        noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                        getOptionValue={e => e._id}
                                        getOptionLabel={e => <OptionOrgz orgz={e} />}
                                    />
                            }
                        />
                    </Form.Group>
                </div>
            </div>
            <div className='d-flex justify-content-end gap-2 w-100'>
                <Button
                    onClick={() => previousStep()}
                    variant='outline-secondary'
                    type='button'
                    className='w-100'
                >
                    Regresar
                </Button>
                <Button
                    disabled={isSavingNew}
                    variant='primary'
                    type='submit'
                    className='w-100'
                >
                    Guardar
                </Button>
            </div>
        </form >
    )
}