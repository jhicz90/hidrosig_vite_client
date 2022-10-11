import { useDispatch, useSelector } from 'react-redux'
import { Card, Container } from 'react-bootstrap'
import styled from 'styled-components'
import { CreateUserSys } from '../../usersys/components'
import { CreateOccupation } from '../../occupation/components'
import { CreateRole } from '../../role/components'
import { CreateCommittee, CreateJunta } from '../../organization/components'

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
                            <CreateUserSys />
                            <CreateOccupation />
                            <CreateRole />
                            <CreateJunta />
                            <CreateCommittee />
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