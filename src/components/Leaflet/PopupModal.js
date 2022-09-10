import React, { useRef } from 'react'
import { Popup } from 'react-leaflet'

export const PopupModal = ({ title = 'Mensaje', classNameBody = '', children }) => {

    const popModal = useRef()

    const handleClose = () => {
        popModal.current.remove()
    }

    return (
        <Popup ref={popModal} className="leaflet-popup-modal" closeButton={false} minWidth={300}>
            <div className="leaflet-popup-header">
                <div>{title}</div>
                <button onClick={handleClose} type='button' className="btn-close btn-close-white" />
            </div>
            <div className={`leaflet-popup-body ${classNameBody}`}>
                {children}
            </div>
        </Popup>
    )
}
