import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, ButtonGroup, Form } from 'react-bootstrap'
import CheckboxTree from 'react-checkbox-tree'
import { FaChevronDown, FaChevronRight, FaRedoAlt, FaRegCheckSquare, FaRegMinusSquare, FaRegSquare, FaTimes } from 'react-icons/fa'
import { InputSearch } from './InputSearch'
import { LoadingPage } from './LoadingPage'
import { clearActiveNodeIrrigationNetwork, setActiveAmbitIrrigationNetwork, setActiveNodeIrrigationNetwork, setNetIrrigChkIrrigationNetwork, setNetIrrigExpIrrigationNetwork, useGetListJuntaQuery, useLazyGetIrrigationNetByJuntaQuery, setNetIrrigData } from '../store/actions'
import { childrenNode } from '../helpers'

import 'react-checkbox-tree/lib/react-checkbox-tree.css'

export const ChannelNetworkTree = ({ showCheckbox = false, selectNode = true }) => {

    const navigate = useNavigate()
    const location = useLocation()

    const dispatch = useDispatch()
    const { lvlAccess } = useSelector(state => state.auth)
    const {
        activeNode: { id, name, depth, data, loading },
        activeAmbit,
        netIrrig,
        netIrrigExp,
        netIrrigChk,
        netIrrigBase
    } = useSelector(state => state.irrigationnetwork)

    const { data: optionsJunta = [], isLoading: isLoadingListJunta } = useGetListJuntaQuery('')
    const [loadIrrigNet, { isLoading: isLoagindTree }] = useLazyGetIrrigationNetByJuntaQuery()

    const [search, setSearch] = useState('')

    const [ctrlKey, setCtrlKey] = useState(false)
    const [netExpanded, setNetExpanded] = useState(netIrrigExp)

    useEffect(() => {
        if (lvlAccess === 1 && activeAmbit !== '') {
            loadIrrigNet({ junta: activeAmbit, showCheckbox })
        } else if (lvlAccess > 1) {
            loadIrrigNet({ showCheckbox })
        }
    }, [lvlAccess, activeAmbit])

    useEffect(() => {
        dispatch(setNetIrrigExpIrrigationNetwork(netExpanded))
    }, [netExpanded])

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
                    // dispatch(setNetIrrigExpIrrigationNetwork([...netIrrigExp, node.value]))
                    filtered.push({ ...node, children })
                } else {
                    setNetExpanded(e => [...e, node.value])
                    // dispatch(setNetIrrigExpIrrigationNetwork([...netIrrigExp, node.value]))
                    const { children, ...rest } = node
                    filtered.push(rest)
                }
            }

            return filtered
        }

        if (search.trim().length > 0) {
            setNetExpanded([])
            dispatch(setNetIrrigExpIrrigationNetwork([]))
            // dispatch(setNetIrrigChkIrrigationNetwork([]))
            dispatch(setNetIrrigData(netIrrigBase.reduce(filterNodes, [])))
        } else {
            dispatch(setNetIrrigExpIrrigationNetwork([]))
            // dispatch(setNetIrrigChkIrrigationNetwork([]))
            dispatch(setNetIrrigData(netIrrigBase))
        }
    }, [search])

    const handleSelectNode = (e) => {

        if (showCheckbox) {
            if (e.treeDepth > 0) {
                if (e.checked === true) {
                    if (ctrlKey) {
                        // setChecked([...checked.filter(c => !childrenNode(e).includes(c))])
                        dispatch(setNetIrrigChkIrrigationNetwork([...netIrrigBase.filter(c => !childrenNode(e).includes(c))]))
                    } else {
                        // setChecked(checked.filter(c => c !== e.value))
                        dispatch(setNetIrrigChkIrrigationNetwork(netIrrigBase.filter(c => c !== e.value)))
                    }
                } else if (e.checked === false) {
                    if (ctrlKey) {
                        // setChecked([...checked, ...childrenNode(e)])
                        dispatch(setNetIrrigChkIrrigationNetwork([...netIrrigChk, ...childrenNode(e)]))
                    } else {
                        // setChecked([...checked, e.value])
                        dispatch(setNetIrrigChkIrrigationNetwork([...netIrrigChk, e.value]))
                    }
                }
            }
        }

        if (selectNode) {
            dispatch(setActiveNodeIrrigationNetwork({ id: e.value, name: e.label, depth: e.treeDepth, data: null, loading: false }))
        }
    }

    const onCheck = (checked) => {
        dispatch(setNetIrrigChkIrrigationNetwork(checked))
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
        if (lvlAccess === 1 && activeAmbit !== '') {
            loadIrrigNet({ junta: activeAmbit, showCheckbox })
        } else if (lvlAccess > 1) {
            loadIrrigNet({ showCheckbox })
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
            <div className='row'>
                {
                    lvlAccess === 1
                    &&
                    <div className='col'>
                        <Form.Select
                            disabled={optionsJunta.length === 0 || isLoadingListJunta}
                            value={activeAmbit}
                            onChange={({ target }) => dispatch(setActiveAmbitIrrigationNetwork(target.value))}
                            autoComplete='off'
                        >
                            <option value={''}>Seleccione la junta de usuarios</option>
                            {
                                optionsJunta.map(j => <option key={j._id} value={j._id}>{j.name}</option>)
                            }
                        </Form.Select>
                    </div>
                }
                <div className='col'>
                    <InputSearch className='m-0' value={search} onChange={(e) => setSearch(e)} />
                </div>
                <div className='col-auto'>
                    <Button
                        onClick={handleReload}
                        variant='neutral'
                    >
                        <FaRedoAlt size={20} />
                    </Button>
                </div>
                {
                    !!id
                    &&
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
                                        navigate(`?w=structure_edit&id=${id}`, { state: { from: location } })
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
                }
            </div>
            {
                isLoagindTree
                    ?
                    <LoadingPage />
                    :
                    <div className='row my-3 px-3'>
                        <div className='col-12 p-3'>
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
                        </div>
                    </div>
            }
        </>
    )
}
