import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import { FaWifi } from 'react-icons/fa'
import { MD5 } from 'crypto-js'
// import PerfectScrollbar from 'react-perfect-scrollbar'

import { checkModules, imageSysGet } from '../../../helpers'
import { UseStatusConnection } from '../../../hooks'
import { menuModule } from '../../../types'

// import 'react-perfect-scrollbar/dist/css/styles.css'

const secretAccess = import.meta.env.VITE_APP_SECRET_ACCESS

export const AppSidebar = () => {

    const isOnline = UseStatusConnection()

    const handleSidebar = () => {
        const rootApp = document.querySelector('.root-app')
        rootApp.classList.toggle('sidebar-app-mobile-toggled')
    }

    return (
        <>
            <nav id='sidebar' className='sidebar-app sidebar-inverted'>
                {/* <PerfectScrollbar>
                    <Sidebar />
                </PerfectScrollbar> */}
                <Sidebar />
                <div
                    className='nav-footer user-select-none'
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <FaWifi color={isOnline ? '#4caf50' : '#f44336'} />
                    <span className='ms-1'>{isOnline ? 'Conectado' : 'Desconectado'}</span>
                </div>
            </nav>
            <button onClick={handleSidebar} className='sidebar-app-mobile-backdrop' />
        </>
    )
}

const Sidebar = () => {

    const { modules } = useSelector(state => state.auth)

    const menu = modules.find(m => m.key === MD5(secretAccess).toString()) ? menuModule : checkModules(menuModule, modules)

    return (
        <nav>
            {menu.map((item, index) => <NavItem key={`${item.label}-${index}`} item={{ ...item, to: `/app/${item.to}` }} />)}
        </nav>
    )
}

const NavItem = ({ item }) => {
    const { label, icon: IconNav, to, children } = item

    if (children) {
        return <NavItemHeader item={item} />
    }

    return (
        <NavLink
            end
            to={to}
            className={({ isActive }) => isActive ? 'active' : ''}
        >
            {item.icon && <IconNav />}
            <span className={item.icon && 'ms-2'}>{label}</span>
        </NavLink>
    )
}

const NavItemHeader = ({ item }) => {
    const location = useLocation()

    const { label, icon: IconNav, to: headerToPath, children } = item
    const [expanded, setExpand] = useState(
        location.pathname.includes(headerToPath)
    )

    const onExpandChange = e => {
        e.preventDefault()
        setExpand(expanded => !expanded)
    }

    return (
        <>
            {
                <>
                    <button
                        className={`has-sub ${expanded ? 'active' : ''}`}
                        onClick={onExpandChange}
                    >
                        {item.icon && <IconNav />}
                        <span className={item.icon && 'ms-2'}>{label}</span>
                    </button>

                    {expanded && (
                        <div className={`sub-menu`}>
                            {
                                children.map((itemChildren, index) => {
                                    const key = `${itemChildren.label}-${index}`

                                    const { label, Icon, children } = itemChildren

                                    if (children) {
                                        return (
                                            <div key={key}>
                                                <NavItemHeader
                                                    item={{
                                                        ...itemChildren,
                                                        to: resolveLinkPath(itemChildren.to, item.to),
                                                    }}
                                                />
                                            </div>
                                        )
                                    }

                                    return (
                                        <NavLink
                                            key={key}
                                            to={resolveLinkPath(itemChildren.to, item.to)}
                                            className={({ isActive }) => isActive ? 'active' : ''}
                                        >
                                            {Icon && <img src={imageSysGet(Icon)} alt='img' width='24' height='24' />}
                                            <span className={Icon && 'ms-1'}>{label}</span>
                                        </NavLink>
                                    )
                                })
                            }
                        </div>
                    )}
                </>
            }
        </>
    )
}

const resolveLinkPath = (childTo, parentTo) => `${parentTo}/${childTo}`