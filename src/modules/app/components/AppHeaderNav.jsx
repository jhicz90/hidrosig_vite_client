import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { IoIosArrowBack, IoMdMenu } from 'react-icons/io'
import { Button } from 'react-bootstrap'
// import useMediaQuery from 'beautiful-react-hooks/useMediaQuery'

export const AppHeaderNav = () => {

    const navigate = useNavigate()
    const { pageHeader, idPageHeader, titlePageHeader, descPageHeader, actionPageHeader } = useSelector(state => state.ui)
    const [openMenu, setOpenMenu] = useState(false)
    // const widthSize = useMediaQuery('(max-width: 960px)')
    const widthSize = true

    const handleBack = () => {
        navigate(-1)
    }

    const handleMenu = () => {
        setOpenMenu(!openMenu)
    }

    return (
        <>
            {
                pageHeader &&
                <Page
                    id={idPageHeader}
                >
                    <div className='page-info'>
                        <div className='page-nav'>
                            <Button
                                variant='link-dark'
                                onClick={handleBack}
                            >
                                <IoIosArrowBack size={30} />
                            </Button>
                            <div className='page-desc'>
                                <h5 className='m-0'>{titlePageHeader}</h5>
                                {descPageHeader !== '' && <p className='m-0'>{descPageHeader}</p>}
                            </div>
                        </div>
                        <Button
                            onClick={handleMenu}
                            variant='outline-neutral'
                            className='page-toggler'
                        >
                            <IoMdMenu size={30} />
                        </Button>
                    </div>
                    <div className='page-actions' style={{ display: `${openMenu || !widthSize ? 'flex' : 'none'}` }}>
                        {actionPageHeader}
                    </div>
                </Page>
            }
        </>
    )
}

const Page = styled.div`
    background-color: transparent;
    min-height: 60px;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;

    > .page-info {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        > .page-nav {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        > .page-toggler {
            display: none;
        }
    }

    > .page-actions {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
    }

    @media (max-width: 960px) {
        flex-direction: column;

        > .page-info {
            justify-content: space-between;
            width: 100%;

            > .page-toggler {
                display: block;
            }
        }

        > .page-actions {
            display: none;
            flex-direction: column;
            flex-basis: 100%;
            align-items: flex-start;
            width: 100%;
        }
    }
`