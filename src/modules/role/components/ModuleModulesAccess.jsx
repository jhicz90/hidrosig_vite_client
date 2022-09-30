import { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Accordion, Button, Card, Col, Form, FormCheck, ListGroup, Row } from 'react-bootstrap'
import { BsSearch } from 'react-icons/bs'
import { RiRefreshLine } from 'react-icons/ri'
import { InputTextDebounce, LoadingPage } from '../../../components'
import { groupBy } from '../../../helpers'
import { useGetModulesQuery } from '../../../store'
import { CreateModule } from '.'

export const RoleModuleModuleAccess = () => {

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
                                                            <ListGroup.Item key={`module-${perm.nameTag}-${index}`} as={'label'}>
                                                                <div className='d-block'>
                                                                    <FormCheck
                                                                        inline
                                                                        type='checkbox'
                                                                        id={`chck-module-${perm._id}`}
                                                                        checked={!modules.find(p => p === perm._id) ? false : true}
                                                                        onChange={e => {
                                                                            if (!e.target.checked) {
                                                                                checkRemoveModule(perm._id)
                                                                            } else {
                                                                                checkAddModule(perm._id)
                                                                            }
                                                                        }}
                                                                    />
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
                        </>
                }
            </Card.Body>
        </Card >
    )
}
