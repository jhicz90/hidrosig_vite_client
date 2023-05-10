import React from 'react'
import { Badge } from 'react-bootstrap'
import { FaCheck, FaLock } from 'react-icons/fa'
import { TagStatus } from './TagStatus'

export const OptionYearRate = ({ yearRate = null }) => {
    return (
        <div className='d-flex flex-column p-1'>
            <div className='fw-bold' style={{ fontSize: '0.75rem' }}>{`${yearRate.year} - ${yearRate.campaign === 1 ? 'CHICA - I' : 'GRANDE - II'}`}</div>
            <div className='text-muted' style={{ fontSize: '0.75rem' }}>ESTADO: {
                    yearRate.opened
                        ?
                        <Badge
                            bg='success'
                            pill
                            className='d-inline-flex px-2 py-1'
                        >
                            <FaCheck className='me-1' />Aperturado
                        </Badge>
                        :
                        <Badge
                            bg='secondary'
                            pill
                            className='d-inline-flex px-2 py-1'
                        >
                            <FaLock className='me-1' />
                            Cerrado
                        </Badge>
                }
            </div>
            <div className='text-muted' style={{ fontSize: '0.75rem' }}>ACTIVO: <TagStatus status={yearRate.active} /></div>
        </div>
    )
}
