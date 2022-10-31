import styled from 'styled-components'
import { CreateBlock, CreatePettyCash } from '../../'

export const AppToolboxBar = () => {

    return (
        <div
            className='rounded-0 shadow-none mb-3'
            style={{
                backgroundColor: '#fff3cd',
                borderBottom: '1px solid #ffc107'
            }}
        >
            <div className='p-3'>
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
            </div>
        </div>
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