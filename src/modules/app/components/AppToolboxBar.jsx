import { useSelector } from 'react-redux'
import styled from 'styled-components'

export const AppToolboxBar = () => {

    const { toolbar: { title, actions } } = useSelector(state => state.app)

    return (
        <>
            {
                (!!actions || title !== '')
                &&
                <Toolbar>
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
                </Toolbar>
            }
        </>
    )
}

const Toolbar = styled.div`
    background-color: #f5f8fa;
    /* background-color: #fff3cd;
    border-bottom: 1px solid #ffc107; */
    height: 70px !important;
    position: sticky;
    top: 60px;
    z-index: 1;

    & + .scroll-content .sticky-mobile {
        top: 150px;
    }
    /* & + .scroll-content {
        height: calc(100vh - 130px) !important;
    } */
`

const NavBarMain = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    height: 70px;
`

const NavBarInfo = styled.div`
    font-size: 1.25rem;
    font-weight: bold;
`

const NavBarTool = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
`