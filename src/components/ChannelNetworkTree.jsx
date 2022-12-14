import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Form, Row } from 'react-bootstrap'
import CheckboxTree from 'react-checkbox-tree'
import { FaChevronDown, FaChevronRight, FaRedoAlt, FaRegCheckSquare, FaRegMinusSquare, FaRegSquare } from 'react-icons/fa'
import { InputSearch } from './InputSearch'
import { searchIrrigationNetworkByJunta, setActiveNodeIrrigationNetwork, setNetIrrigExpIrrigationNetwork } from '../store/actions'
import { childrenNode, treeNetIrrig } from '../helpers'

import 'react-checkbox-tree/lib/react-checkbox-tree.css'

export const ChannelNetworkTree = ({ showCheckbox = false, selectNode = true, children }) => {

    const dispatch = useDispatch()
    const { activeAmbit, netIrrig, netIrrigExp, netIrrigChk } = useSelector(state => state.irrigationnetwork)
    const [search, setSearch] = useState('')
    const [ctrlKey, setCtrlKey] = useState(false)
    const [net, setNet] = useState([])
    const [netFiltered, setNetFiltered] = useState([])
    const [checked, setChecked] = useState(netIrrigChk)
    const [netExpanded, setNetExpanded] = useState(netIrrigExp)

    useEffect(() => {
        dispatch(searchIrrigationNetworkByJunta(activeAmbit))
    }, [dispatch, activeAmbit])

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
            setChecked([])
            setNetFiltered(net)
        } else {
            // Se desabilito para poder volver a ver los nodos expandidos
            setNetExpanded([])
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
            dispatch(setActiveNodeIrrigationNetwork({ id: e.value, name: e.label, depth: e.treeDepth, data: null, loading: false }))
        }
    }

    const onCheck = (checked) => {
        setChecked(checked)
    }

    const onExpand = (expand) => {
        dispatch(setNetIrrigExpIrrigationNetwork(expand))
    }

    const keyEvent = (e) => {
        if (e.ctrlKey) {
            setCtrlKey(true)
        } else {
            setCtrlKey(false)
        }
    }

    const handleReload = () => {
        dispatch(searchIrrigationNetworkByJunta(activeAmbit))
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
            <Form.Group as={Row} className='my-3 px-3' controlId='uChannel'>
                <Col xs='auto'>
                    <InputSearch value={search} onChange={(e) => setSearch(e)} />
                </Col>
                <Col xs='auto'>
                    <Button
                        onClick={handleReload}
                        variant='neutral'
                    >
                        <FaRedoAlt size={20} />
                    </Button>
                </Col>
                <Col>
                    {children}
                </Col>
            </Form.Group>
            <div className='row my-3 px-3'>
                <div className='col-12 p-3'>
                    <CheckboxTree
                        onClick={handleSelectNode}
                        nodes={netFiltered}
                        checked={checked}
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
        </>
    )
}
