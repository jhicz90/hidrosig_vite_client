import React, { useLayoutEffect } from 'react'
import validator from 'validator'
import { Route, Routes, Navigate, useSearchParams } from 'react-router-dom'
// import socketClient from 'socket.io-client'

import { Layout } from '../layout'

import { GuardRoute } from '../../../guards'

import { DashboardPage, PageError404, PageError500 } from '../pages'
import {
    ModuleAmbitRoutes,
    DesignRoutes,
    ModuleIrrigationRoutes,
    ModuleFilesRoutes,
    ModuleSigaRoutes,
    ModuleSystemRoutes,
    ModuleAccountingRoutes,
    EditVoucher,
    EditDocument,
    EditStructure,
    EditSection,
    EditWaterSource,
    EditZone,
    EditBlock,
    CreateUserSys,
    CreateOccupation,
    CreateRole,
    CreateStructure,
    CreateSection,
    CreateWaterSource,
    CreateDocument,
    CreateBlock,
    CreateZone,
    CreateJunta,
    CreateCommittee,
    CreateVoucher,
    CreatePettyCash,
} from '../../'

// const serverUrl = import.meta.env.VITE_APP_SERVER_URL
// const secretAccess = process.env.REACT_APP_SECRET_ACCESS

export const AppRoot = () => {
    // const dispatch = useDispatch()
    // const navigate = useNavigate()
    // const { uid, iat, exp, session } = useSelector(state => state.auth)

    // Efecto de estilo, al redimensionar el área de la página
    useLayoutEffect(() => {
        const updateSize = () => {
            if (window.innerWidth > 1200) {
                const rootApp = document.querySelector('.root-app')
                rootApp.classList.remove('sidebar-app-mobile-toggled')
            }
        }
        window.addEventListener('resize', updateSize)
        updateSize()
        return () => window.removeEventListener('resize', updateSize)
    }, [])

    // Efecto de cerrar sesión al eliminar el TOKEN
    // useEffect(() => {
    //     if (!token) {
    //         dispatch(startLogout())
    //         navigate('/login', { replace: true })
    //     }
    // }, [token, navigate, dispatch])

    // Efecto de cerrar sesión cuando el TOKEN o tiempo expire
    // useEffect(() => {
    //     setTimeout(() => {
    //         dispatch(startLogout())
    //         msgAlert('La sesión actual expiro, por favor inicie sesión para volver a ingresar', 7000, 'info')
    //         navigate('/login', { replace: true })
    //     }, (exp - iat) * 1000)
    // }, [iat, exp, navigate, dispatch])

    // Efecto que contiene el manejo de eventos y la conexión con el SERVER (Socket.IO)
    // useEffect(() => {
    //     const socket = socketClient(serverUrl)

    //     socket.on('connection', () => {
    //         console.log(`La sesión se ah conectado correctamente al servidor con el ID: ${socket.id}`)
    //         socket.emit('online', { uid, session })
    //     })

    //     socket.on('logoutApp', data => {
    //         if (data.ok) {
    //             if (data.usersysLogoutId === uid) {
    //                 dispatch(startLogout())
    //                 msgAlert('Sesión cerrada remotamente por cambios en la cuenta de usuario', 5000, 'success')
    //                 navigate('/login', { replace: true })
    //             }
    //         }
    //     })

    //     socket.on('closeSessionRemote', data => {
    //         if (data.ok) {
    //             if (data.usersysSession === session) {
    //                 dispatch(startLogout())
    //                 msgAlert(`Sesión cerrada remotamente por el usuario: ${data.usersysNameAction}`, 5000, 'success')
    //                 navigate('/login', { replace: true })
    //             }
    //         }
    //     })

    //     socket.on('closeAllSession', data => {
    //         if (data.ok) {
    //             if (data.closedSessions.length > 0) {
    //                 const sessions = data.closedSessions.filter(s => s.session === session).length

    //                 if (sessions > 0) {
    //                     dispatch(startLogout())
    //                     msgAlert(`Sesión cerrada remotamente por el usuario: ${data.usersysNameAction}`, 5000, 'success')
    //                     navigate('/login', { replace: true })
    //                 }
    //             }
    //         }
    //     })

    //     socket.on('uidProfile', data => {
    //         if (data.ok) {
    //             if (data.usersysProfileId === uid) {
    //                 dispatch(startChecking())
    //                 msgAlert('Sesión actualizada remotamente por cambios en el perfil del usuario', 5000, 'success')
    //             }
    //         }
    //     })

    //     socket.on('permissionUpdated', data => {
    //         if (data.ok) {
    //             if (data.usersysLoginId === uid) {
    //                 dispatch(startChecking())
    //                 msgAlert('Sesión actualizada remotamente por cambios en los permisos', 5000, 'success')
    //             }
    //         }
    //     })

    //     socket.on('usersysLogged', data => {
    //         if (data.ok) {
    //             if (data.usersysSession !== null) {
    //                 dispatch(startUpdateActiveUserSysNewData({ uid: data.usersysSession }))
    //             }
    //         }
    //     })

    //     return () => {
    //         socket.emit('offline', { uid, session })
    //         socket.disconnect()
    //     }
    // }, [uid, session, dispatch])

    return (
        <Routes>
            <Route
                path={`/`}
                element={
                    <>
                        <Layout />
                        <CreatePettyCash />
                        <CreateVoucher />
                        <EditVoucher />
                        <CreateBlock />
                        <CreateZone />
                        <CreateJunta/>
                    </>
                }
            >
                <Route index element={<Navigate to={`/app/home`} />} />
                <Route path={`home`} element={<DashboardPage />} />
                <Route path={`ambit/*`} element={<ModuleAmbitRoutes />} />
                <Route path={`schm/*`} element={<ModuleIrrigationRoutes />} />
                <Route path={`acct/*`} element={<ModuleAccountingRoutes />} />
                <Route path={`files/*`} element={<ModuleFilesRoutes />} />
                <Route path={`siga/*`} element={<ModuleSigaRoutes />} />
                <Route path={`tools/*`}>
                    <Route path={`design/*`} element={<GuardRoute meta={['tools']} component={DesignRoutes} />} />
                </Route>
                <Route path={`sys/*`} element={<ModuleSystemRoutes />} />
                <Route path={`err404`} element={<PageError404 />} />
                <Route path={`err500`} element={<PageError500 />} />
                <Route path={`*`} element={<PageError404 />} />
            </Route>
        </Routes>
    )
}

const ModalRoutes = () => {
    const [searchParams] = useSearchParams()
    const options = Object.fromEntries([...searchParams])
    const { w, id } = Object.fromEntries([...searchParams])

    return (
        <>
            {
                w === 'comm_create' && id === 'new'
                &&
                <CreateCommittee />
            }
            {
                w === 'zone_create' && id === 'new'
                &&
                <CreateZone />
            }
            {
                w === 'zone_edit' && validator.isMongoId(id)
                &&
                <EditZone zoneid={id} />
            }
            {
                w === 'block_create' && id === 'new'
                &&
                <CreateBlock />
            }
            {
                w === 'block_edit' && validator.isMongoId(id)
                &&
                <EditBlock blockid={id} />
            }
            {
                w === 'structure_create' && id === 'new'
                &&
                <CreateStructure />
            }
            {
                w === 'structure_edit' && validator.isMongoId(id)
                &&
                <EditStructure strid={id} />
            }
            {
                w === 'section_create' && id === 'new' && validator.isMongoId(options.structure_id)
                &&
                <CreateSection structureId={options.structure_id} />
            }
            {
                w === 'section_edit' && validator.isMongoId(id)
                &&
                <EditSection secid={id} />
            }
            {
                w === 'watersource_create' && id === 'new'
                &&
                <CreateWaterSource />
            }
            {
                w === 'watersource_edit' && validator.isMongoId(id)
                &&
                <EditWaterSource wsid={id} />
            }
            {
                w === 'document_create' && id === 'new'
                &&
                <CreateDocument />
            }
            {
                w === 'document_edit' && validator.isMongoId(id)
                &&
                <EditDocument docid={id} />
            }
            {
                w === 'usersys_create' && id === 'new'
                &&
                <CreateUserSys />
            }
            {
                w === 'occupation_create' && id === 'new'
                &&
                <CreateOccupation />
            }
            {
                w === 'role_create' && id === 'new'
                &&
                <CreateRole />
            }
        </>
    )
}