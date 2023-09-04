import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { FaRedoAlt } from 'react-icons/fa'
import { useAuthStore, useChannelStore } from '@/hooks'
import { ChannelNetworkTree, InputSearch } from '@/components'
import { useGetListJuntaQuery, useLazyGetIrrigationNetByJuntaQuery } from '@/store/actions'
import CheckboxTree from 'react-checkbox-tree'

import 'react-checkbox-tree/lib/react-checkbox-tree.css'

export const ChannelNetworkPage = () => {

    const { lvlAccess } = useAuthStore()
    const { activeAmbit, setAmbit, netIrrig } = useChannelStore()
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
            loadIrrigNet({ junta: activeAmbit, showCheckbox })
        } else if (lvlAccess > 1) {
            loadIrrigNet({ showCheckbox })
        }
    }

    return (
        <React.Fragment>
            <div className='row'>
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
            {
                netIrrig.length > 0
                &&
                <ChannelNetworkTree
                    netIrrig={netIrrig}
                />
            }
        </React.Fragment>
    )
}
