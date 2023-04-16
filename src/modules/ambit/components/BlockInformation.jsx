import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { Button, Card, Form } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import { Liner, OptionDocument, OptionOrgz } from '../../../components'
import { blockApi, searchCommittee, searchCommitteeByJunta, searchDocument, searchJunta, useUpdateBlockByIdMutation } from '../../../store/actions'

export const BlockInformation = () => {

    const { blkid } = useParams()
    const { lvlAccess } = useSelector(state => state.auth)
    const { data = null } = useSelector(blockApi.endpoints.getBlockById.select(blkid))
    const [updateBlock, { isLoading: isSaving }] = useUpdateBlockByIdMutation()
    const { register, control, handleSubmit, watch, setValue, reset } = useForm()

    const handleUpdate = ({ name, code, desc, junta, committee, resolution }) => {
        updateBlock({
            id: blkid,
            block: { name, code, desc, junta, committee, resolution }
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
                <form id='form-ambit-block-edit-info' onSubmit={handleSubmit(handleUpdate)}>
                    <Liner>Información</Liner>
                    <div className='row'>
                        <div className='col-12 col-md-6'>
                            <Form.Group className='mb-3' controlId='pName'>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    {...register('name', { required: true })}
                                    type='text'
                                    autoComplete='off'
                                />
                            </Form.Group>
                        </div>
                        <div className='col-12 col-md-6'>
                            <Form.Group className='mb-3' controlId='pCode'>
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
                            <Form.Group className='mb-3' controlId='pDesc'>
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
                                    <>
                                        <div className='col-12 col-md-4'>
                                            <Form.Group className='mb-3' controlId='pJunta'>
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
                                                                inputId='pJunta'
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
                                        <div className='col-12 col-md-4'>
                                            <Form.Group className='mb-3' controlId='pCommittee'>
                                                <Form.Label>Comisión de usuarios</Form.Label>
                                                <Controller
                                                    name='committee'
                                                    control={control}
                                                    rules={{ required: true }}
                                                    render={
                                                        ({ field }) =>
                                                            <AsyncSelect
                                                                {...field}
                                                                inputId='pCommittee'
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
                                    </>
                                }
                                {
                                    lvlAccess === 2
                                    &&
                                    <>
                                        <div className='col-12 col-md-4'>
                                            <Form.Group className='mb-3' controlId='newCommittee'>
                                                <Form.Label>Comisión de usuarios</Form.Label>
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
                                    </>
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
