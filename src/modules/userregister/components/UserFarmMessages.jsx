import React from 'react'
import { Button, ListGroup } from 'react-bootstrap'

export const UserFarmMessages = () => {
    return (
        <div className='container-flex-stack'>
            <ListGroup className='min-w-400'>
                <ListGroup.Item action>
                    Familiar del titular
                </ListGroup.Item>
                <ListGroup.Item action>
                    Hijo del titular
                </ListGroup.Item>
            </ListGroup>
            <div className='card flex-1'>
                <div className='card-body'>
                    MENSAJES
                </div>
            </div>
        </div>
    )
}
