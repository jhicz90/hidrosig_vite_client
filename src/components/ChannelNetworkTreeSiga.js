import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, ButtonGroup, Modal } from 'react-bootstrap'
import CheckboxTree from 'react-checkbox-tree'
import { loadActiveSigaNetIrrigChecked, loadActiveSigaNetIrrigExpanded, startGetSigaIrrigationNetwork } from '../actions'
import { childrenNode, treeNetIrrig } from '../helpers'

import 'react-checkbox-tree/lib/react-checkbox-tree.css'

export const ChannelNetworkTreeSiga = ({ search = '', selectNode = true }) => {

    const dispatch = useDispatch()
    const { netIrrig, netIrrigExp, netIrrigChk } = useSelector(state => state.siga)
    const [showModal, setShowModal] = useState(false)
    const [ctrlKey, setCtrlKey] = useState(false)
    const [net, setNet] = useState([])
    const [netFiltered, setNetFiltered] = useState([])
    const [checked, setChecked] = useState(netIrrigChk)
    const [expanded, setExpanded] = useState(netIrrigExp)

    useEffect(() => {
        dispatch(startGetSigaIrrigationNetwork())
    }, [dispatch])

    useEffect(() => {
        const tree = treeNetIrrig(netIrrig, true)
        setNet(tree)
        setNetFiltered(tree)
    }, [netIrrig])

    useEffect(() => {
        setExpanded(netIrrigExp)
    }, [netIrrigExp])

    useEffect(() => {
        // setChecked(checked)
        dispatch(loadActiveSigaNetIrrigChecked(checked))
    }, [dispatch, checked])

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
                    setExpanded(e => [...e, node.value])
                    filtered.push({ ...node, children })
                } else {
                    setExpanded(e => [...e, node.value])
                    const { children, ...rest } = node
                    filtered.push(rest)
                }
            }

            return filtered
        }

        if (search === '') {
            // Se desabilito para poder volver a ver los nodos expandidos
            // setExpanded([])
            setChecked([])
            setNetFiltered(net)
        } else {
            // Se desabilito para poder volver a ver los nodos expandidos
            setExpanded([])
            setChecked([])
            setNetFiltered(net.reduce(filterNodes, []))
        }
    }, [search, net])

    const handleSelectNode = (e) => {
        if (selectNode) {
            if (e.treeDepth > 0) {
                if (e.checked === true) {
                    if (ctrlKey) {
                        setChecked([...checked.filter(c => !childrenNode(e).includes(c))])
                    } else {
                        setChecked(checked.filter(c => c !== e.value))
                    }
                } else if (e.checked === false) {
                    if (ctrlKey) {
                        setChecked([...checked, ...childrenNode(e)])
                    } else {
                        setChecked([...checked, e.value])
                    }
                }
            }
        }
    }

    const handleDeselectAll = () => {
        setChecked([])
    }

    const handleColapseAll = () => {
        dispatch(loadActiveSigaNetIrrigExpanded([]))
    }

    const onCheck = (checked) => {
        setChecked(checked)
    }

    const onExpand = (expand) => {
        dispatch(loadActiveSigaNetIrrigExpanded(expand))
    }

    const onHide = () => {
        setShowModal(false)
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
            <button
                onClick={() => setShowModal(!showModal)}
                className='btn btn-neutral'
            >
                Red de riego
            </button>
            <Modal
                show={showModal}
                onHide={onHide}
                backdrop='static'
                size='lg'
                scrollable
            >
                <Modal.Header closeButton closeVariant="white">
                    <Modal.Title>
                        Red de riego
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert variant='secondary'>
                        Para seleccionar los canales derivados tenga presionada la tecla <kbd>CTRL</kbd> y seleccione el canal superior
                    </Alert>
                    <ButtonGroup className='mb-3 w-100'>
                        <button
                            onClick={handleColapseAll}
                            className='btn btn-neutral'
                        >
                            Cerrar red de riego
                        </button>
                        <button
                            onClick={handleDeselectAll}
                            className='btn btn-neutral'
                        >
                            Deseleccionar todos
                        </button>
                    </ButtonGroup>
                    <CheckboxTree
                        onClick={handleSelectNode}
                        nodes={netFiltered}
                        checked={checked}
                        expanded={expanded}
                        onCheck={onCheck}
                        onExpand={onExpand}
                        iconsClass="fa5"
                        noCascade
                        lang={{ toggle: 'Abrir / cerrar' }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <button
                        onClick={onHide}
                        className='btn btn-neutral'
                    >
                        Cerrar
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
