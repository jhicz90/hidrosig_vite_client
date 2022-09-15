import { Button, Card, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export const AppToolboxBar = () => {

    const navigate = useNavigate()

    return (
        <Container>
            <Card>
                <Card.Body>
                    <NavBarMain>
                        <NavBarInfo>
                            Titulo o subtitulo de la página
                        </NavBarInfo>
                        <NavBarTool>
                            <Button
                                variant='primary'
                                onClick={() => navigate('/app/sys/user_sys/new')}
                            >
                                Nuevo
                            </Button>
                        </NavBarTool>
                    </NavBarMain>
                </Card.Body>
            </Card>
        </Container>
    )
}

const NavBarMain = styled.div`
    display: flex;
    justify-content: space-between;
`

const NavBarInfo = styled.div`
    font-size: 0.75rem;
`

const NavBarTool = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
`