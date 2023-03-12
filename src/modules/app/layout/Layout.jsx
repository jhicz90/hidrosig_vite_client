import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { FilesUploadModal, FilesUploadTempModal } from '../../../components'
import { AppComandBar, AppHeader, AppSidebar, AppToolboxBar } from '../components'

export const Layout = () => {
    return (
        <RootApp className='root-app animate__animated animate__fadeIn'>
            <AppHeader />
            <ContentApp className='content-app'>
                <AppSidebar />
                <AppToolboxBar />
                <div className='scroll-content'>
                    <Outlet />
                </div>
            </ContentApp>
            <AppComandBar />
            <FilesUploadModal />
            <FilesUploadTempModal />
        </RootApp>
    )
}

const RootApp = styled.div`
    /* height: 100vh;
    overflow: hidden; */
`

const ContentApp = styled.main`
    margin-left: 220px;
    position: relative;
    display:flex;
    flex-direction: column;

    & .scroll-content{
        /* overflow-y: scroll; */
        padding-top: 0;
        padding-bottom: 0;
        /* height: calc(100vh - 60px); */
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