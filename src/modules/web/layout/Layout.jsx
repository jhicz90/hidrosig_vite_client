import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { WebHeader } from '../components/WebHeader'

export const Layout = () => {
    return (
        <RootWeb>
            <WebHeader />
            <ContentWeb>
                <Outlet />
            </ContentWeb>
        </RootWeb>
    )
}

const RootWeb = styled.div`
    padding-top: 4rem;
`

const ContentWeb = styled.main`
    padding-left: 1rem;
    padding-right: 1rem;
`