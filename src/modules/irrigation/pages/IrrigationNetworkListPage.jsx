import { Card, Nav, Tab } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { IrrigationNetworkChannel } from '../components'

export const IrrigationNetworkListPage = () => {

    const { hash } = useLocation()

    return (
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
                                        {/* <ListWaterSource /> */}
                                    </Tab.Pane>
                                </Tab.Content>
                            </Card.Body>
                        </Tab.Container>
                    </Card>
                </div>
            </div>
        </div>
    )
}
