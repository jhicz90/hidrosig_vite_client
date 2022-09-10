import React from 'react'
import WinBox from 'react-winbox'

export const WindowBox = ({
    id = (new Date().getTime()),
    title = '',
    posX = 'center',
    posY = '20%',
    hide,
    onClose,
    children
}) => {

    return (
        <WinBox
            id={id}
            width={500}
            height={300}
            noMove={false}
            title={title}
            x={posX}
            y={posY}
            noFull={true}
            noResize={true}
            hide={hide}
            onclose={onClose}
        >
            {children}
        </WinBox>
    )
}
