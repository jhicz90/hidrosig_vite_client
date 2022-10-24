import { Card, Container } from 'react-bootstrap'
import styled from 'styled-components'
import { CreateBlock, CreatePettyCash } from '../../'

export const AppToolboxBar = () => {

    return (
        <Container>
            <Card>
                <Card.Body>
                    <NavBarMain>
                        <NavBarInfo>
                            Titulo o subtitulo de la página
                        </NavBarInfo>
                        <NavBarTool>
                            <CreateBlock />
                            <CreatePettyCash />
                            {/* Aqui van los botones de accion rapida */}
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