import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { Button, Form } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import { useNavigateState } from '../../../hooks'
import { Liner, LoadingPage, OptionDocument, OptionOrgz } from '../../../components'
import { searchCommittee, searchCommitteeByJunta, searchDocument, searchJunta, useAddBlockMutation, useLazyNewBlockQuery } from '../../../store/actions'

export const BlockCreatePage = () => {

    const [redirect, redirectEscape] = useNavigateState('/app/ambit/trrty/block')

    const { lvlAccess } = useSelector(state => state.auth)
    const [newBlock, { data = null, isLoading, isError }] = useLazyNewBlockQuery()
    const [addBlock, { isLoading: isSavingAdd, isSuccess: isSaved }] = useAddBlockMutation()
    const { register, watch, control, handleSubmit, setValue, reset } = useForm()

    const handleSave = async (newData) => {
        try {
            await addBlock(newData)
        } catch (err) {
            console.log(err)
        }
    }

    const handleDiscard = () => {
        redirect()
    }

    useEffect(() => {
        newBlock()
    }, [])

    useEffect(() => {
        reset({
            ...data
        })
    }, [reset, data])

    useEffect(() => {
        if (isError) {
            redirectEscape()
        }
    }, [isError])

    useEffect(() => {
        if (isSaved) {
            newBlock()
        }
    }, [isSaved])

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <div className='container-fluid'>
            <div className='row my-3'>
                <div className='col-12'>
                    <div className='row align-items-center justify-content-between g-3'>
                        <div className='col-12 col-md-auto'>
                            <h4 className='mb-0'>NUEVO BLOQUE DE RIEGO</h4>
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
                                    form='form-ambit-block-create'
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
                    <form id='form-ambit-block-create' onSubmit={handleSubmit(handleSave)}>
                        <Liner>Información</Liner>
                        <div className='row'>
                            <div className='col-12 col-md-6'>
                                <Form.Group className='mb-3' controlId='newName'>
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        {...register('name', { required: true })}
                                        type='text'
                                        autoComplete='off'
                                    />
                                </Form.Group>
                            </div>
                            <div className='col-12 col-md-6'>
                                <Form.Group className='mb-3' controlId='newCode'>
                                    <Form.Label>Código</Form.Label>
                                    <Form.Control
                                        {...register('code', { required: true })}
                                        type='text'
                                        autoComplete='off'
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <div className='row'>
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
                        {
                            lvlAccess < 3
                            &&
                            <>
                                <Liner>Ámbito</Liner>
                                <div className='row'>
                                    {
                                        lvlAccess === 1
                                        &&
                                        <div className='row'>
                                            <div className='col-12 col-md-6'>
                                                <Form.Group className='mb-3' controlId='newJunta'>
                                                    <Form.Label>Junta de usuarios</Form.Label>
                                                    <Controller
                                                        name='junta'
                                                        control={control}
                                                        rules={{
                                                            required: true,
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
                                                                    styles={{
                                                                        control: (baseStyles, state) => ({
                                                                            ...baseStyles,
                                                                            minHeight: '90px',
                                                                        }),
                                                                    }}
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
                                                </Form.Group>
                                            </div>
                                            <div className='col-12 col-md-6'>
                                                <Form.Group className='mb-3' controlId='newCommittee'>
                                                    <Form.Label>Comisiones</Form.Label>
                                                    <Controller
                                                        name='committee'
                                                        control={control}
                                                        rules={{ required: true }}
                                                        render={
                                                            ({ field }) =>
                                                                <AsyncSelect
                                                                    {...field}
                                                                    inputId='newCommittee'
                                                                    classNamePrefix='rc-select'
                                                                    styles={{
                                                                        control: (baseStyles, state) => ({
                                                                            ...baseStyles,
                                                                            minHeight: '90px',
                                                                        }),
                                                                    }}
                                                                    isClearable
                                                                    isDisabled={!watch('junta')}
                                                                    loadOptions={async (e) => {
                                                                        return await searchCommitteeByJunta(watch('junta')._id, e)
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
                                    }
                                    {
                                        lvlAccess === 2
                                        &&
                                        <div className='col-12 col-md-6'>
                                            <Form.Group className='mb-3' controlId='newCommittee'>
                                                <Form.Label>Comisiones</Form.Label>
                                                <Controller
                                                    name='committee'
                                                    control={control}
                                                    rules={{ required: true }}
                                                    render={
                                                        ({ field }) =>
                                                            <AsyncSelect
                                                                {...field}
                                                                inputId='newCommittee'
                                                                classNamePrefix='rc-select'
                                                                styles={{
                                                                    control: (baseStyles, state) => ({
                                                                        ...baseStyles,
                                                                        minHeight: '90px',
                                                                    }),
                                                                }}
                                                                isClearable
                                                                defaultOptions
                                                                loadOptions={searchCommittee}
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
                                    }
                                </div>
                            </>
                        }
                        <Liner>Documento</Liner>
                        <div className='row'>
                            <div className='col-12 col-md-6'>
                                <Form.Group className='mb-3' controlId='pResolution'>
                                    <Form.Label>Resolución</Form.Label>
                                    <Controller
                                        name='resolution'
                                        control={control}
                                        render={
                                            ({ field }) =>
                                                <AsyncSelect
                                                    {...field}
                                                    inputId='pResolution'
                                                    classNamePrefix='rc-select'
                                                    isClearable
                                                    defaultOptions
                                                    loadOptions={searchDocument}
                                                    menuPlacement={'auto'}
                                                    placeholder={`Buscar...`}
                                                    loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                                    noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                                    getOptionValue={e => e._id}
                                                    getOptionLabel={e => <OptionDocument docm={e} />}
                                                />
                                        }
                                    />
                                </Form.Group>
                            </div>
                        </div>
                    </form >
                </div>
            </div>
        </div>
    )
}
