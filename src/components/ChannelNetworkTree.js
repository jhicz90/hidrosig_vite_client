import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckboxTree from 'react-checkbox-tree'
import { loadActiveNetIrrigExpanded, loadActiveNode, startGetIrrigationNetwork } from '../actions'
import { childrenNode, treeNetIrrig } from '../helpers'

import 'react-checkbox-tree/lib/react-checkbox-tree.css'

export const ChannelNetworkTree = ({ junta = '', search = '', showCheckbox = false, selectNode = true }) => {

    const dispatch = useDispatch()
    const { netIrrig, netIrrigExp, netIrrigChk } = useSelector(state => state.channelnetwork)

    const [ctrlKey, setCtrlKey] = useState(false)

    const [net, setNet] = useState([])
    const [netFiltered, setNetFiltered] = useState([])
    const [netChecked, setNetChecked] = useState([])
    const [netExpanded, setNetExpanded] = useState(netIrrigExp)

    useEffect(() => {
        dispatch(startGetIrrigationNetwork({ junta }))
    }, [junta, dispatch])

    useEffect(() => {
        const tree = treeNetIrrig(netIrrig, showCheckbox)
        setNet(tree)
        setNetFiltered(tree)
    }, [netIrrig, showCheckbox])

    useEffect(() => {
        setNetExpanded(netIrrigExp)
    }, [netIrrigExp])

    useEffect(() => {
        const filterNodes = (filtered, node) => {
            const children = (node.children || []).reduce(filterNodes, [])

            if (
                // Node's label matches the search string
                node.label.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1 ||
                // Or a children has a matching node
                children.length
            ) {
                if (children.length > 0) {
                    setNetExpanded(e => [...e, node.value])
                    filtered.push({ ...node, children })
                } else {
                    setNetExpanded(e => [...e, node.value])
                    const { children, ...rest } = node
                    filtered.push(rest)
                }
            }

            return filtered
        }

        if (search === '') {
            // Se desabilito para poder volver a ver los nodos expandidos
            // setExpanded([])
            setNetChecked([])
            setNetFiltered(net)
        } else {
            // Se desabilito para poder volver a ver los nodos expandidos
            setNetExpanded([])
            setNetChecked([])
            setNetFiltered(net.reduce(filterNodes, []))
        }
    }, [search, net])

    const handleSelectNode = (e) => {
        if (selectNode) {
            if (e.treeDepth > 0) {
                if (e.checked === true) {
                    if (ctrlKey) {
                        setNetChecked([...netChecked.filter(c => !childrenNode(e).includes(c))])
                    } else {
                        setNetChecked(netChecked.filter(c => c !== e.value))
                    }
                } else if (e.checked === false) {
                    if (ctrlKey) {
                        setNetChecked([...netChecked, ...childrenNode(e)])
                    } else {
                        setNetChecked([...netChecked, e.value])
                    }
                }
            }
            dispatch(loadActiveNode({ id: e.value, name: e.label, depth: e.treeDepth }))
        }
    }

    const onCheck = (checked) => {
        setNetChecked(checked)
    }

    const onExpand = (expand) => {
        dispatch(loadActiveNetIrrigExpanded(expand))
    }

    const keyEvent = (e) => {
        if (e.ctrlKey) {
            setCtrlKey(true)
        } else {
            setCtrlKey(false)
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', keyEvent)
        document.addEventListener('keyup', keyEvent)
        return () => {
            document.removeEventListener('keydown', keyEvent)
            document.removeEventListener('keyup', keyEvent)
        }
    }, [])

    return (
        <>
            <CheckboxTree
                onClick={handleSelectNode}
                nodes={netFiltered}
                checked={netChecked}
                expanded={netExpanded}
                onCheck={onCheck}
                onExpand={onExpand}
                iconsClass="fa5"
                noCascade
            />
        </>
    )
}
