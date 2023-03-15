import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

export const AppToolboxBar = () => {

    const { toolbar: { title, actions } } = useSelector(state => state.app)
    const [scrollPos, setScrollPos] = useState(0)

    const handleScroll = () => {
        const position = window.pageYOffset
        setScrollPos(position)
    }

    useEffect(() => {
        document.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <>
            {
                (!!actions || title !== '')
                &&
                <Toolbar position={scrollPos}>
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

const Toolbar = styled.div.attrs(props => ({
    position: props.position > 0 ? `0 .5rem .5rem -0.5rem rgba(0,0,0,.2) !important` : 'inherit',
    bgColor: props.position > 0 ? '#fff' : 'transparent'
}))`
    /* background-color: #f5f8fa; */
    background-color: ${props => props.bgColor};
    box-shadow: ${props => props.position};
    /* background-color: #fff3cd;
    border-bottom: 1px solid #ffc107; */
    height: 70px !important;
    position: sticky;
    top: 60px;
    z-index: 500;
    transition: box-shadow 0.2s linear;

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