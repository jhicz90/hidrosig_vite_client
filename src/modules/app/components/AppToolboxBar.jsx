import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Container } from 'react-bootstrap'
import styled from 'styled-components'
import { startAddNewUserSys } from '../../../store/usersys'

export const AppToolboxBar = () => {

    const dispatch = useDispatch()
    const { isSavingNew } = useSelector(state => state.usersys)

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
                                disabled={isSavingNew}
                                variant='primary'
                                onClick={() => dispatch(startAddNewUserSys())}
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