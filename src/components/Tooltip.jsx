import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FcInfo } from 'react-icons/fc'

export const TooltipInfo = ({ message = 'Ingrese un mensaje' }) => {

    const renderTooltip = (props) => (
        <Tooltip {...props} className='text-start'>
            {message}
        </Tooltip>
    )

    return (
        <OverlayTrigger
            placement='auto'
            overlay={renderTooltip}
        >
            <span>
                <FcInfo size={20} />
            </span>
        </OverlayTrigger>
    )
}
