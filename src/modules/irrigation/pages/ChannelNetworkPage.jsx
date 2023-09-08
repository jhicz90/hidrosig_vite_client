import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, ButtonGroup, Form, InputGroup } from 'react-bootstrap'
import { FaRedoAlt, FaTimes } from 'react-icons/fa'
import { useAuthStore, useChannelStore } from '@/hooks'
import { ChannelNetworkTree, InputSearch } from '@/components'
import { useGetListJuntaQuery, useLazyGetIrrigationNetByJuntaQuery } from '@/store/actions'

export const ChannelNetworkPage = () => {

    const navigate = useNavigate()
    const { lvlAccess } = useAuthStore()
    const { activeAmbit, activeNode, setAmbit, netIrrigExp, clearNode, setNetIrrigExp } = useChannelStore()
    const [search, setSearch] = useState('')
    const { data: optionsJunta = [], isLoading: isLoadingOptionsJunta } = useGetListJuntaQuery()
    const [loadIrrigNet, { isLoading: isLoadingChannelNetwork, isFetching }] = useLazyGetIrrigationNetByJuntaQuery()

    const handleAmbit = ({ target }) => {
        setAmbit(target.value)
        if (target.value !== '') {
            if (lvlAccess === 1) {
                loadIrrigNet({ junta: target.value, showCheckbox: false })
            } else {
                loadIrrigNet({ showCheckbox: false })
            }
        }
    }

    const handleReload = () => {
        if (lvlAccess === 1 && activeAmbit !== '') {
            loadIrrigNet({ junta: activeAmbit, showCheckbox: false })
        } else if (lvlAccess > 1) {
            loadIrrigNet({ showCheckbox: false })
        }
    }

    return (
        <React.Fragment>
            <div className='container-fluid'>
                <div className='row my-2'>
                    <div className='col-12 col-md-6'>
                        <InputGroup>
                            <Form.Select
                                disabled={optionsJunta.length === 0 || isLoadingOptionsJunta}
                                value={activeAmbit}
                                onChange={handleAmbit}
                                autoComplete='off'
                            >
                                <option value={''}>Seleccione la junta de usuarios</option>
                                {
                                    optionsJunta.map(j => <option key={j._id} value={j._id}>{j.name}</option>)
                                }
                            </Form.Select>
                            <Button
                                onClick={handleReload}
                                disabled={activeAmbit === ''}
                                variant='neutral-icon'
                            >
                                <FaRedoAlt />
                            </Button>
                        </InputGroup>
                    </div>
                    <div className='col-12 col-md-6'>
                        <InputSearch
                            value={search}
                            onChange={(e) => setSearch(e)}
                            loading={isFetching}
                            placeholder='Buscar canales'
                        />
                    </div>
                </div>
                <div className='row my-2'>
                    <div className='col-auto'>
                        {
                            !!activeNode
                            &&
                            <ButtonGroup>
                                <Button
                                    disabled={!activeNode.id}
                                    variant='neutral'
                                    className='text-primary text-decoration-none'
                                    onClick={() => {
                                        if (activeNode.depth === 0) {
                                            navigate(`/app/schm/irrig/ws/${activeNode.id}`)
                                        } else {
                                            navigate(`/app/schm/irrig/chn/${activeNode.id}`)
                                        }
                                    }}
                                >
                                    {activeNode.name || 'No seleccionado'}
                                </Button>
                                <Button
                                    onClick={() => clearNode()}
                                    disabled={!activeNode.id}
                                    variant='neutral-icon'
                                >
                                    <FaTimes />
                                </Button>
                            </ButtonGroup>
                        }
                    </div>
                    <div className='col-auto'>
                        <Button
                            onClick={() => setNetIrrigExp([])}
                            disabled={netIrrigExp.length === 0}
                            variant='neutral'
                        >
                            Cerrar red de riego
                        </Button>
                    </div>
                    {/* <div className='col-auto'>
                    <Button
                        onClick={() => setNetIrrigChk([])}
                        disabled={netIrrig.length === 0}
                        variant='neutral'
                    >
                        Deseleccionar todos
                    </Button>
                </div> */}
                </div>
                <ChannelNetworkTree
                    loading={isLoadingChannelNetwork}
                    selectNode={true}
                    searchNode={search}
                />
            </div>
        </React.Fragment>
    )
}
