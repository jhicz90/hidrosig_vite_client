import { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Accordion, Alert, Button, Card, Col, Form, FormCheck, ListGroup, Row } from 'react-bootstrap'
import { BsSearch } from 'react-icons/bs'
import { RiRefreshLine } from 'react-icons/ri'
import { FcLock } from 'react-icons/fc'
import { InputTextDebounce, LoadingPage } from '../../../components'
import { groupBy } from '../../../helpers'
import { useGetPermsQuery } from '../../../store'
import { startUpdatePermissionsRole } from '../../../store/role'
import { CreatePermission } from '.'

export const RoleModulePermissions = () => {

    const [search, setSearch] = useState('')
    const { active, isSaving } = useSelector(state => state.role)
    const { data: listPermissions = [], isLoading, refetch } = useGetPermsQuery(search, { refetchOnMountOrArgChange: true })
    const [permissions, setPermissions] = useState(active.permissions.map(p => p._id))

    const grouped = useMemo(() => groupBy(listPermissions), [listPermissions])

    const checkInGroup = (nameGroup) => {
        return grouped[nameGroup].filter(pg => permissions.find(p => p === pg._id)).length
    }

    const checkAddPermission = (valuePerm) => {
        setPermissions(p => ([...p, valuePerm]))
    }

    const checkRemovePermission = (valuePerm) => {
        const remove = permissions.filter(p => p !== valuePerm)
        setPermissions(remove)
    }

    const handleSave = () => {
        if (modules.length > 0) {
            dispatch(startUpdatePermissionsRole(permissions))
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
                            <Form.Group as={Row} className='my-3 px-3 gx-2' controlId='searchPermission'>
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
                                    <CreatePermission />
                                </Col>
                            </Form.Group>
                            <Alert className='mx-3' variant='info'>
                                Seleccione los permisos que desee agregar en el rol de usuario, una vez seleccionados GUARDE los cambios, luego las sesiones de enlazadas a este rol se actualizarán.
                            </Alert>
                            <Accordion flush className='mb-3'>
                                {
                                    Object.keys(grouped).map((group, index) => (
                                        <Accordion.Item key={`perm-restrict-${group}`} eventKey={index}>
                                            <Accordion.Header>
                                                {group}
                                                <span className='ms-1'>{`(${checkInGroup(group)})`}</span>
                                            </Accordion.Header>
                                            <Accordion.Body className='p-0'>
                                                <ListGroup variant='flush'>
                                                    {
                                                        grouped[group].map((perm, index) => (
                                                            <ListGroup.Item key={`permission-${perm.nameTag}-${index}`} as={'label'}>
                                                                <div className='d-block'>
                                                                    {
                                                                        !perm.private
                                                                        ?
                                                                        <FormCheck
                                                                            inline
                                                                            type='checkbox'
                                                                            id={`chck-permission-${perm._id}`}
                                                                            checked={!permissions.find(p => p === perm._id) ? false : true}
                                                                            onChange={e => {
                                                                                if (!e.target.checked) {
                                                                                    checkRemovePermission(perm._id)
                                                                                } else {
                                                                                    checkAddPermission(perm._id)
                                                                                }
                                                                            }}
                                                                        />
                                                                        :
                                                                        <FcLock className='me-3' />
                                                                    }
                                                                    <b>{perm.nameTag}</b>
                                                                </div>
                                                                <p className='mb-0'>{perm.desc}</p>
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
