import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Card, Nav, Tab } from 'react-bootstrap'

export const OrganizationListPage = () => {

    const { hash } = useLocation()
    const { lvlAccess } = useSelector(state => state.auth)

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col'>
                    {
                        lvlAccess === 3
                            ?
                            <Card className='pb-3'>
                                <ListCommittee />
                            </Card>
                            :
                            <Card>
                                <Tab.Container defaultActiveKey={hash === '' ? '#junta' : hash}>
                                    <Card.Header>
                                        <Nav variant='tabs' fill>
                                            <Nav.Item>
                                                <Nav.Link eventKey='#junta'>Junta</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey='#comm'>Comisiones</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </Card.Header>
                                    <Card.Body className='p-0'>
                                        <Tab.Content>
                                            <Tab.Pane eventKey='#junta'>
                                                <ListJunta />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey='#comm'>
                                                <ListCommittee />
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Card.Body>
                                </Tab.Container>
                            </Card>
                    }
                </div>
            </div>
        </div>
    )
}