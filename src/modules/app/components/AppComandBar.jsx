import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MD5 } from 'crypto-js'
import CommandPalette, { useHandleOpenCommandPalette, filterItems, renderJsonStructure } from 'react-cmdk'
import { menuModule } from '../../../types'
import { checkModules, comandModules } from '../../../helpers'

const secretAccess = import.meta.env.VITE_APP_SECRET_ACCESS

export const AppComandBar = () => {

    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState('root')

    const { modAccess: modules } = useSelector(state => state.auth)
    const actions = comandModules(modules[0] === MD5(secretAccess).toString() ? [...menuModule] : checkModules([...menuModule], modules))

    const rootItems = filterItems(
        [
            {
                heading: 'Páginas',
                id: 'pages',
                items: actions.filter(c => c.parent === null).map(c => (
                    {
                        id: c.id,
                        children: c.label,
                        icon: c.rcIcon,
                        showType: false,
                        closeOnSelect: c.children ? false : true,
                        onClick: () => {
                            if (c.children) {
                                setPage(c.id)
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

    useHandleOpenCommandPalette(setOpen)

    return (
        <CommandPalette
            isOpen={open}
            onChangeOpen={(e) => {
                setOpen(e)
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
                                        icon: c.rcIcon,
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


    // const { modAccess: modules } = useSelector(state => state.auth)
    // const actions = comandModules(modules[0] === secretAccess ? [...menuModule] : checkModules([...menuModule], modules)).map(ac => ({
    //     id: ac.id,
    //     name: ac.label,
    //     shortcut: ac.shortcut || [],
    //     keywords: `${ac.label} ${ac.detail || ''}`,
    //     section: ac.section,
    //     subtitle: ac.detail || '',
    //     perform: () => navigate(ac.to),
    // }))

    // const actionItems = filterItems(
    //     [
    //         {
    //             heading: 'Páginas',
    //             id: 'pages',
    //             items: [
    //                 {
    //                     children: 'Página principal',
    //                     icon: 'HomeIcon',
    //                     id: 'pages.home'
    //                 },
    //                 {
    //                     children: 'Ajustes de sistema',
    //                     icon: 'CogIcon',
    //                     id: 'pages.settings',
    //                 },
    //                 {
    //                     children: 'Documentación',
    //                     icon: IoDocumentAttachSharp,
    //                     id: 'pages.documentation',
    //                 }
    //             ]
    //         }
    //     ],
    //     search
    // )