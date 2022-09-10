import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

export const AppSidebarMenu = (module_item) => {

    const { icon_fa, title, url, chld } = module_item
    const haveItems = chld || []

    const [match, setMatch] = useState(false)
    let { pathname } = useLocation();

    useEffect(() => {
        if (`/${pathname.split('/')[2]}` === module_item.url) {
            setMatch(true)
        } else {
            setMatch(false)
        }
    }, [pathname, module_item])

    return (
        <>
            {
                haveItems.length > 0
                    ?
                    <li className={match ? "has-sub mm-active" : "has-sub"}>
                        <Link to="#" className="has-arrow" aria-expanded={match ? true : false}>
                            <i className={icon_fa}></i>
                            <span className="ms-1">{title}</span>
                        </Link>
                        <ul className={match ? "sub-menu mm-collapse mm-show" : "sub-menu mm-collapse"}>
                            {
                                chld.sort(function (a, b) {
                                    return a.order - b.order
                                }).map((item_chld) => (
                                    item_chld.access &&
                                    <li key={item_chld.title}>
                                        <NavLink to={`/app${url}${item_chld.url}`}>{item_chld.title}</NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                    </li>
                    :
                    <li>
                        <NavLink exact to={`/app${url}`}>
                            <i className={icon_fa}></i>
                            <span className="ms-1">{title}</span>
                        </NavLink>
                    </li>
            }
        </>
    )
}
