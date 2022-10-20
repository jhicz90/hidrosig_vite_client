import { Card, Nav, Tab } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { BlockList, ZoneList } from '../components'

export const TerritoryListPage = () => {

    const { hash } = useLocation()

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col'>
                    <Card>
                        <Tab.Container defaultActiveKey={hash === '' ? '#zone' : hash}>
                            <Card.Header>
                                <Nav variant='tabs'>
                                    <Nav.Item>
                                        <Nav.Link eventKey="#zone">Zonas</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="#block">Bloques de riego</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="#location">Localidades</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Header>
                            <Card.Body className='p-0'>
                                <Tab.Content>
                                    <Tab.Pane eventKey="#zone" unmountOnExit>
                                        <ZoneList />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="#block" unmountOnExit>
                                        <BlockList />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="#location" unmountOnExit>
                                        {/* <TerritoriesLocationList /> */}
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
