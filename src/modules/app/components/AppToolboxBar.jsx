import { useSelector } from 'react-redux'
import styled from 'styled-components'

export const AppToolboxBar = () => {

    const { toolbar: { title, actions } } = useSelector(state => state.app)

    return (
        <>
            {
                (!!actions && title === '')
                &&
                <div
                    className='rounded-0 shadow-none'
                    style={{
                        backgroundColor: '#fff3cd',
                        borderBottom: '1px solid #ffc107'
                    }}
                >
                    <div className="container g-0">
                        <NavBarMain>
                            <NavBarInfo>
                                {title}
                            </NavBarInfo>
                            <NavBarTool>
                                {actions}
                            </NavBarTool>
                        </NavBarMain>
                    </div>
                </div>
            }
        </>
    )
}

const NavBarMain = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    min-height: 70px;
`

const NavBarInfo = styled.div`
    font-size: 0.75rem;
`

const NavBarTool = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
`