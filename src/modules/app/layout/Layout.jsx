import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
// import { ResourceUpload } from '../../components'
import { AppComandBar, AppHeader, AppSidebar } from '../components'

export const Layout = () => {
    return (
        <RootApp className='root-app animate__animated animate__fadeIn'>
            <AppHeader />
            <AppSidebar />
            <ContentApp className='content-app'>
                {/* <AppHeaderNav /> */}
                <Outlet />
            </ContentApp>
            {/* <ResourceUpload /> */}
            <AppComandBar />
        </RootApp>
    )
}

const RootApp = styled.div`
    height: 100vh;
`

const ContentApp = styled.main`
    padding-top: 60px;
    margin-left: 220px;
    position: relative;
    min-height: 100%;

    & .container,
    & .container-fluid {
        margin: 20px auto;
    }

    @media (max-width: 1200px) {
        margin-left: 0;
    }
`

// main.content-app {
//     padding-top: 60px;
// }

// main.content-app .container {
//     margin: 20px auto;
//     /* padding-top: 10px;
//     padding-bottom: 10px; */
// }

// .content-app {
//     margin-left: 220px;
//     position: relative;
//     min-height: 100%;
// }

// @media (max-width: 1199.98px) {
//     .content-app {
//         margin-left: 0;
//     }
// }