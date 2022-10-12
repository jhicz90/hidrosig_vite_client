import { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Accordion, Alert, Button, Card, Col, Form, FormCheck, ListGroup, Row, Table } from 'react-bootstrap'
import { BsSearch } from 'react-icons/bs'
import { RiRefreshLine } from 'react-icons/ri'
import { FcLock } from 'react-icons/fc'
import { useGetModulesQuery,startUpdateModulesRole } from '../../../store'
import { InputTextDebounce, LoadingPage } from '../../../components'
import { groupBy } from '../../../helpers'
import { CreateModule } from '.'

export const RoleModuleModuleAccess = () => {

    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const { active, isSaving } = useSelector(state => state.role)
    const { data: listModules = [], isLoading, refetch } = useGetModulesQuery(search, { refetchOnMountOrArgChange: true })
    const [modules, setModules] = useState(active.modules.map(p => p._id))

    const grouped = useMemo(() => groupBy(listModules), [listModules])

    const checkInGroup = (nameGroup) => {
        return grouped[nameGroup].filter(pg => modules.find(p => p === pg._id)).length
    }

    const checkAddModule = (valueMod) => {
        setModules(p => ([...p, valueMod]))
    }

    const checkRemoveModule = (valueMod) => {
        const remove = modules.filter(p => p !== valueMod)
        setModules(remove)
    }

    const handleSave = () => {
        if (modules.length > 0) {
            dispatch(startUpdateModulesRole(modules))
        }
    }

    return (
        <Card>
            <Card.Body className='p-0'>
                {
                    isLoading
                        ?
                        <LoadingPage />
                        :
                        <>
                            <Form.Group as={Row} className='my-3 px-3 gx-2' controlId='searchModule'>
                                <Form.Label column xs={'auto'} >
                                    <BsSearch size={24} />
                                </Form.Label>
                                <Col>
                                    <InputTextDebounce value={search} onChange={(e) => setSearch(e)} />
                                </Col>
                                <Col xs='auto'>
                                    <Button
                                        onClick={() => refetch()}
                                        className='d-flex align-items-center'
                                        variant='neutral'
                                    >
                                        <RiRefreshLine size={24} />
                                    </Button>
                                </Col>
                                <Col xs='auto'>
                                    <CreateModule />
                                </Col>
                            </Form.Group>
                            <Alert className='mx-3' variant='info'>
                                Seleccione los módulos que desee agregar en el rol de usuario, una vez seleccionados GUARDE los cambios, luego las sesiones de enlazadas a este rol se actualizarán.
                            </Alert>
                            <Accordion flush className='mb-3'>
                                {
                                    Object.keys(grouped).map((group, index) => (
                                        <Accordion.Item key={`module-restrict-${group}`} eventKey={index}>
                                            <Accordion.Header>
                                                {group}
                                                <span className='ms-1'>{`(${checkInGroup(group)})`}</span>
                                            </Accordion.Header>
                                            <Accordion.Body className='p-0'>
                                                <ListGroup variant='flush'>
                                                    {
                                                        grouped[group].map((modl, index) => (
                                                            <ListGroup.Item key={`module-${modl.nameTag}-${index}`} as={'label'}>
                                                                <div className='d-block'>
                                                                    {
                                                                        !modl.private
                                                                            ?
                                                                            <FormCheck
                                                                                inline
                                                                                type='checkbox'
                                                                                id={`chck-module-${modl._id}`}
                                                                                checked={!modules.find(p => p === modl._id) ? false : true}
                                                                                onChange={e => {
                                                                                    if (!e.target.checked) {
                                                                                        checkRemoveModule(modl._id)
                                                                                    } else {
                                                                                        checkAddModule(modl._id)
                                                                                    }
                                                                                }}
                                                                            />
                                                                            :
                                                                            <FcLock className='me-3' />
                                                                    }
                                                                    <b>{modl.nameTag}</b>
                                                                </div>
                                                                <p className='mb-0'>{modl.desc}</p>
                                                            </ListGroup.Item>
                                                        ))
                                                    }
                                                </ListGroup>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    ))
                                }
                            </Accordion>
                            <div className='d-flex justify-content-end gap-2 my-3 px-3 gx-2'>
                                <Button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    variant='primary'
                                >
                                    Guardar cambios
                                </Button>
                            </div>
                        </>
                }
            </Card.Body>
        </Card >
    )
}
