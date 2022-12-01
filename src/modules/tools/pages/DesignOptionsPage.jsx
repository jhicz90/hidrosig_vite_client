import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Card, Nav, Tab } from 'react-bootstrap'
import { clearToolbarActions, setToolbarActions, setToolbarTitle } from '../../../store/actions'
import { DesignGatePage } from './'

export const DesignOptionsPage = () => {

    const dispatch = useDispatch()
    const { hash } = useLocation()

    useEffect(() => {
        dispatch(clearToolbarActions())
        dispatch(setToolbarTitle('DISEÑO'))
        // dispatch(setToolbarActions(
        //     <>
        //         {lvlAccess < 3 && <CreateJunta />}
        //         <CreateCommittee />
        //     </>
        // ))

        // const data = async () => {
        //     console.log(await fetchByToken({
        //         endpoint: `tools/drawsluicegate`,
        //         params: {
        //             thickness: 0.15,
        //             inputWidth: 0.6,
        //             outputWidth: 0.4,
        //             lengthStructure: 1.6,
        //             gateWidth: 0.6,
        //             bladeHeight: 1,
        //             gateHeight: 1.6
        //         }
        //     }))
        // }

        // data()

        return () => {
            dispatch(clearToolbarActions())
        }
    }, [dispatch])

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col'>
                    <Card>
                        <Tab.Container defaultActiveKey={hash === '' ? '#gate' : hash}>
                            <Card.Header>
                                <Nav variant='tabs'>
                                    <Nav.Item>
                                        <Nav.Link eventKey='#gate'>Compuertas</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey='#lock'>Retenes</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey='#fall'>Caidas</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Header>
                            <Card.Body className='p-0'>
                                <Tab.Content>
                                    <Tab.Pane eventKey='#gate'>
                                        <DesignGatePage />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey='#lock'>
                                        <>Retenes</>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey='#fall'>
                                        <>Caidas</>
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