import React, { useLayoutEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
// import socketClient from 'socket.io-client'

import { Layout } from '../layout'

import { GuardRoute } from '../../../guards'

import { DashboardPage, NotFoundPage } from '../pages'
import {
    SigaRoutes,
    SystemRoutes,
    ResourceRoutes,
    PettyCashRoutes,
    VoucherRoutes,
    DesignRoutes,
    AmbitRoutes,
    IrrigationSchemeRoutes
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
        <>
            <Routes>
                <Route path={`/`} element={<Layout />}>
                    <Route index element={<Navigate to={`/app/home`} />} />
                    <Route path={`home`} element={<DashboardPage />} />
                    <Route path={`ambit/*`} element={<AmbitRoutes />} />
                    <Route path={`schm/*`} element={<IrrigationSchemeRoutes />} />
                    {/* <Route path={`ambit`}>
                        <Route index element={<AmbitResume />} />
                        <Route path={`orgz`} element={<GuardRoute meta={['ambit', 'organization']} component={OrganizationList} />} />
                        <Route path={`orgz/junta/:id`} element={<GuardRoute meta={['ambit', 'organization']} component={JuntaEdit} />} />
                        <Route path={`orgz/comm/:id`} element={<GuardRoute meta={['ambit', 'organization']} component={CommitteeEdit} />} />
                        <Route path={`trrty`} element={<GuardRoute meta={['ambit', 'territory']} component={TerritoryList} />} />
                        <Route path={`trrty/zone/:id`} element={<GuardRoute meta={['ambit', 'territory']} component={ZoneEdit} />} />
                        <Route path={`trrty/block/:id`} element={<GuardRoute meta={['ambit', 'territory']} component={BlockEdit} />} />
                        <Route path={`geoobj`} element={<GuardRoute meta={['ambit', 'geographic']} component={GeoObjectList} />} />
                        <Route path={`geoobj/new`} element={<GuardRoute meta={['ambit', 'geographic']} component={GeoObjectNew} />} />
                    </Route>
                    <Route path={`user_reg`}>
                        <Route index element={<AppUserRegResume />} />
                        <Route path={`user_farm`} element={<GuardRoute meta={['userreg', 'userfarm']} component={UserFarmList} />} />
                    </Route>
                    <Route path={`schm`}>
                        <Route path={`irrig`} element={<GuardRoute meta={['irrigschm', 'irrignet']} component={IrrigationNetworkList} />} />
                        <Route path={`irrig/strtr/:id`} element={<GuardRoute meta={['irrigschm', 'irrignet']} component={StructureEdit} />} />
                        <Route path={`irrig/sect/:id`} element={<GuardRoute meta={['irrigschm', 'irrignet']} component={SectionEdit} />} />
                        <Route path={`irrig/wtsrc/:id`} element={<GuardRoute meta={['irrigschm', 'irrignet']} component={WaterSourceEdit} />} />
                        <Route path={`var`} element={<GuardRoute meta={['irrigschm', 'variables']} component={VariableList} />} />
                    </Route>*/}
                    <Route path={`acct`}>
                        <Route path={`resume`} element={<>Hola somos el resumen de contabilidad</>} />
                        <Route path={`petty_cash/*`} element={<GuardRoute meta={['accounting']} component={PettyCashRoutes} />} />
                        <Route path={`voucher/*`} element={<GuardRoute meta={['accounting']} component={VoucherRoutes} />} />
                    </Route>
                    <Route path={`exp/*`} element={<ResourceRoutes />} />
                    <Route path={`siga/*`} element={<SigaRoutes />} />
                    <Route path={`tools/*`}>
                        <Route path={`design/*`} element={<GuardRoute meta={['tools']} component={DesignRoutes} />} />
                    </Route>
                    <Route path={`sys/*`} element={<SystemRoutes />} />
                    <Route path={`*`} element={<NotFoundPage />} />
                </Route>
            </Routes>
        </>
    )
}