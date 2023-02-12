import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MD5 } from 'crypto-js'
import CommandPalette, { useHandleOpenCommandPalette, filterItems, renderJsonStructure } from 'react-cmdk'
import { menuModule } from '../../../types'
import { checkModules, comandModules } from '../../../helpers'
import { setCmkbarShow } from '../../../store/actions'

import 'react-cmdk/dist/cmdk.css'

const secretAccess = import.meta.env.VITE_APP_SECRET_ACCESS

export const AppComandBar = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const [page, setPage] = useState('root')

    const { cmkbar: { show } } = useSelector(state => state.app)
    const { modAccess: modules } = useSelector(state => state.auth)
    const actions = comandModules(modules.find(m => m === MD5(secretAccess).toString()) ? [...menuModule] : checkModules([...menuModule], modules))

    const rootItems = filterItems(
        [
            {
                heading: 'Páginas',
                id: 'pages',
                items: actions.filter(c => c.parent === null).map(c => (
                    {
                        id: c.id,
                        children: c.label,
                        icon: c.icon,
                        showType: false,
                        closeOnSelect: c.children ? false : true,
                        onClick: () => {
                            if (c.children) {
                                setPage(c.id)
                                setSearch('')
                            } else {
                                navigate(c.to)
                            }
                        }
                    }
                ))
            }
        ],
        search
    )

    useHandleOpenCommandPalette((handle) => dispatch(setCmkbarShow(handle())))

    return (
        <CommandPalette
            isOpen={show}
            onChangeOpen={(e) => {
                dispatch(setCmkbarShow(e))
                setPage('root')
            }}
            search={search}
            onChangeSearch={setSearch}
            page={page}
            placeholder={`Buscar...`}
        >
            <CommandPalette.Page id={'root'}>
                {renderJsonStructure(rootItems)}
            </CommandPalette.Page>
            {
                actions.filter(cf => cf.parent === null && cf.children).map(rItem => {
                    const newPageItems = filterItems(
                        [
                            {
                                heading: rItem.label,
                                id: rItem.id,
                                items: actions.filter(cf => cf.parent === rItem.id).map(c => (
                                    {
                                        id: c.id,
                                        children: c.label,
                                        icon: c.icon,
                                        showType: false,
                                        closeOnSelect: true,
                                        onClick: () => {
                                            setPage('root')
                                            navigate(c.to)
                                        }
                                    }
                                ))
                            }
                        ],
                        search
                    )

                    return (
                        <CommandPalette.Page key={rItem.id} id={rItem.id} onEscape={() => setPage('root')}>
                            {renderJsonStructure(newPageItems)}
                        </CommandPalette.Page>
                    )
                })
            }
        </CommandPalette>
    )
}