import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import { Card, Nav, Tab } from 'react-bootstrap'
import { CreateStructure, IrrigationNetworkChannel, WaterSourceList } from '../components'
import { clearToolbarActions, setToolbarActions, setToolbarTitle } from '../../../store/actions'

export const IrrigationNetworkListPage = () => {

    const dispatch = useDispatch()
    const { hash } = useLocation()

    useEffect(() => {
        dispatch(clearToolbarActions())
        dispatch(setToolbarTitle('RED DE RIEGO'))
        dispatch(setToolbarActions(
            <>
                <CreateStructure />
            </>
        ))

        return () => {
            dispatch(clearToolbarActions())
        }
    }, [dispatch])

    return (
        <>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col'>
                        <Card>
                            <Tab.Container defaultActiveKey={hash === '' ? '#net' : hash}>
                                <Card.Header>
                                    <Nav variant='tabs'>
                                        <Nav.Item>
                                            <Nav.Link eventKey='#net'>Red de riego</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey='#source'>Fuentes de agua</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Card.Header>
                                <Card.Body className='p-0'>
                                    <Tab.Content>
                                        <Tab.Pane eventKey='#net'>
                                            <IrrigationNetworkChannel />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey='#source'>
                                            <WaterSourceList />
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Card.Body>
                            </Tab.Container>
                        </Card>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    )
}
