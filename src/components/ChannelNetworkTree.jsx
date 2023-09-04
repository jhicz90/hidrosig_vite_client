import React, { useState } from 'react'
import CheckboxTree from 'react-checkbox-tree'
import { useKeyPressEvent } from 'react-use'
import { FaChevronDown, FaChevronRight, FaRedoAlt, FaRegCheckSquare, FaRegMinusSquare, FaRegSquare, FaTimes } from 'react-icons/fa'
import { LoadingPage } from './LoadingPage'
import { childrenNode } from '@/helpers'

import 'react-checkbox-tree/lib/react-checkbox-tree.css'

export const ChannelNetworkTree = ({ netIrrig = [], netIrrigExp = [], netIrrigChk = [], showCheckbox = false, selectNode = true }) => {

    //! MEJORAR LOS ATRIBUTOS ENVIADOS DEVUELTA CON FUNCIONES QUE AUN FALTAN MEJORAR
    const [search, setSearch] = useState('')

    const [ctrlKey, setCtrlKey] = useState(false)
    const [netTree, setNetTree] = useState(netIrrig)
    const [netExpanded, setNetExpanded] = useState(netIrrigExp)
    const [netChecked, setNetChecked] = useState(netIrrigChk)

    console.log(netIrrig)
    // useEffect(() => {
    //     dispatch(setNetIrrigExpIrrigationNetwork(netExpanded))
    // }, [netIrrigExp])

    // useEffect(() => {
    //     const filterNodes = (filtered, node) => {
    //         const children = (node.children || []).reduce(filterNodes, [])

    //         if (
    //             // Node's label matches the search string
    //             node.label.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1 ||
    //             // Or a children has a matching node
    //             children.length
    //         ) {
    //             if (children.length > 0) {
    //                 setNetExpanded(e => [...e, node.value])
    //                 // dispatch(setNetIrrigExpIrrigationNetwork([...netIrrigExp, node.value]))
    //                 filtered.push({ ...node, children })
    //             } else {
    //                 setNetExpanded(e => [...e, node.value])
    //                 // dispatch(setNetIrrigExpIrrigationNetwork([...netIrrigExp, node.value]))
    //                 const { children, ...rest } = node
    //                 filtered.push(rest)
    //             }
    //         }

    //         return filtered
    //     }

    //     if (search.trim().length > 0) {
    //         setNetExpanded([])
    //         dispatch(setNetIrrigExpIrrigationNetwork([]))
    //         // dispatch(setNetIrrigChkIrrigationNetwork([]))
    //         dispatch(setNetIrrigData(netIrrigBase.reduce(filterNodes, [])))
    //     } else {
    //         dispatch(setNetIrrigExpIrrigationNetwork([]))
    //         // dispatch(setNetIrrigChkIrrigationNetwork([]))
    //         dispatch(setNetIrrigData(netIrrigBase))
    //     }
    // }, [search])

    const handleSelectNode = (e) => {

        // if (showCheckbox) {
        //     if (e.treeDepth > 0) {
        //         if (e.checked === true) {
        //             if (ctrlKey) {
        //                 // setChecked([...checked.filter(c => !childrenNode(e).includes(c))])
        //                 dispatch(setNetIrrigChkIrrigationNetwork([...netIrrigBase.filter(c => !childrenNode(e).includes(c))]))
        //             } else {
        //                 // setChecked(checked.filter(c => c !== e.value))
        //                 dispatch(setNetIrrigChkIrrigationNetwork(netIrrigBase.filter(c => c !== e.value)))
        //             }
        //         } else if (e.checked === false) {
        //             if (ctrlKey) {
        //                 // setChecked([...checked, ...childrenNode(e)])
        //                 dispatch(setNetIrrigChkIrrigationNetwork([...netIrrigChk, ...childrenNode(e)]))
        //             } else {
        //                 // setChecked([...checked, e.value])
        //                 dispatch(setNetIrrigChkIrrigationNetwork([...netIrrigChk, e.value]))
        //             }
        //         }
        //     }
        // }

        // if (selectNode) {
        //     dispatch(setActiveNodeIrrigationNetwork({ id: e.value, name: e.label, depth: e.treeDepth, data: null, loading: false }))
        // }
    }

    const onCheck = (checked) => {
        setNetChecked(checked)
    }

    const onExpand = (expand) => {
        setNetExpanded(expand)
    }

    useKeyPressEvent('ctrl', () => setCtrlKey(true), () => setCtrlKey(false))

    return (
        <React.Fragment>
            {/* {
                !!id
                &&
                <div className='row my-2'>
                    <div className='col-auto'>
                        <ButtonGroup>
                            <Button
                                disabled={loading}
                                variant='neutral'
                                className='text-primary text-decoration-none'
                                onClick={() => {
                                    if (depth === 0) {
                                        navigate(`?w=watersource_edit&id=${id}`, { state: { from: location } })
                                    } else {
                                        // navigate(`?w=structure_edit&id=${id}`, { state: { from: location } })
                                        navigate(`/app/schm/irrig/chn/${id}`, { state: { from: location } })
                                    }
                                }}
                            >
                                {name}
                            </Button>
                            <Button
                                variant='neutral'
                                className='d-flex align-items-center'
                                onClick={() => {
                                    dispatch(clearActiveNodeIrrigationNetwork())
                                }}
                            >
                                <FaTimes size={20} />
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
            } */}
            <div className='row my-3 px-3'>
                <div className='col-12 p-3'>
                    <CheckboxTree
                        onClick={handleSelectNode}
                        nodes={netTree}
                        checked={netChecked}
                        expanded={netExpanded}
                        onCheck={onCheck}
                        onExpand={onExpand}
                        // iconsClass='fa5'
                        noCascade
                        lang={{ toggle: 'Abrir / cerrar' }}
                        icons={{
                            check: <FaRegCheckSquare />,
                            uncheck: <FaRegSquare />,
                            halfCheck: <FaRegMinusSquare />,
                            expandClose: <FaChevronRight />,
                            expandOpen: <FaChevronDown />,
                        }}
                    />
                </div>
            </div>
        </React.Fragment>
    )
}
