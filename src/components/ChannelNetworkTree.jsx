import React, { useState } from 'react'
import CheckboxTree from 'react-checkbox-tree'
import { Alert } from 'react-bootstrap'
import { useKeyPressEvent } from 'react-use'
import { FaChevronDown, FaChevronRight, FaRegCheckSquare, FaRegMinusSquare, FaRegSquare } from 'react-icons/fa'
import { childrenNode } from '@/helpers'
import { useChannelStore } from '@/hooks'
import { LoadingPage } from '@/components'

import 'react-checkbox-tree/lib/react-checkbox-tree.css'

export const ChannelNetworkTree = ({
    searchNode = '',
    showCheckbox = false,
    selectNode = true,
    loading = false,
}) => {
    const [search, setSearch] = useState(searchNode)

    const [ctrlKey, setCtrlKey] = useState(false)
    const { activeAmbit, activeNode, setAmbit, setNode, clearNode, netIrrig, netIrrigBase, netIrrigExp, netIrrigChk, setNetIrrigExp, setNetIrrigChk } = useChannelStore()

    // useEffect(() => {
    //     if (!!netExpanded) {
    //         setNetIrrigExp(netExpanded)
    //     }
    // }, [netExpanded])

    // useEffect(() => {
    //     if (!!setNetIrrigChk) {
    //         setNetIrrigChk(netChecked)
    //     }
    // }, [netChecked])

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
        if (showCheckbox) {
            if (e.treeDepth > 0) {
                if (e.checked === true) {
                    if (ctrlKey) {
                        // setChecked([...checked.filter(c => !childrenNode(e).includes(c))])
                        // dispatch(setNetIrrigChkIrrigationNetwork([...netIrrigBase.filter(c => !childrenNode(e).includes(c))]))
                        setNetIrrigChk([...netIrrigBase.filter(c => !childrenNode(e).includes(c))])
                    } else {
                        // setChecked(checked.filter(c => c !== e.value))
                        // dispatch(setNetIrrigChkIrrigationNetwork(netIrrigBase.filter(c => c !== e.value)))
                        setNetIrrigChk([...netIrrigBase.filter(c => c !== e.value)])
                    }
                } else if (e.checked === false) {
                    if (ctrlKey) {
                        // setChecked([...checked, ...childrenNode(e)])
                        // dispatch(setNetIrrigChkIrrigationNetwork([...netIrrigChk, ...childrenNode(e)]))
                        setNetIrrigChk([...netIrrigChk, ...childrenNode(e)])
                    } else {
                        // setChecked([...checked, e.value])
                        // dispatch(setNetIrrigChkIrrigationNetwork([...netIrrigChk, e.value]))
                        setNetIrrigChk([...netIrrigChk, e.value])
                    }
                }
            }
        }

        if (selectNode) {
            // dispatch(setActiveNodeIrrigationNetwork({ id: e.value, name: e.label, depth: e.treeDepth, data: null, loading: false }))
            setNode({ id: e.value, name: e.label, depth: e.treeDepth, data: null })
        }
    }

    const onExpand = (expand) => {
        setNetIrrigExp(expand)
    }

    const onCheck = (checked) => {
        setNetIrrigChk(checked)
    }

    useKeyPressEvent('ctrl', () => setCtrlKey(true), () => setCtrlKey(false))

    return (
        <React.Fragment>
            {
                loading
                    ?
                    <LoadingPage />
                    :
                    <div style={{ backgroundColor: '#f5f8fa', borderBottomLeftRadius: '9px', borderBottomRightRadius: '9px' }}>
                        <div className='container-flex-stack'>
                            {
                                netIrrig.length > 0
                                    ?
                                    <CheckboxTree
                                        onClick={handleSelectNode}
                                        nodes={netIrrig}
                                        checked={netIrrigChk}
                                        expanded={netIrrigExp}
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
                                    :
                                    <Alert>
                                        <Alert.Heading>Aún no ahi datos cargados en la red de riego</Alert.Heading>
                                        <p>Al parecer los parametros ingresados ya sea sector o ambito no listan ningun canal.</p>
                                        <hr />
                                        <p className='mb-0'>Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
                                    </Alert>
                            }
                        </div>
                    </div>
            }
        </React.Fragment>
    )
}
