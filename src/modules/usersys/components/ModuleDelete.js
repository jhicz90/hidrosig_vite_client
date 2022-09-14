import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { SettingAction, SettingBlock } from '../../../components'
import { DeleteUserSys } from './deleteUserSys'
import { EraseUserSys } from './eraseUserSys'

export const UserSysDelete = () => {

    const { access } = useSelector(state => state.auth)

    return (
        <Card border='danger'>
            <ListGroup variant="flush">
                <DeleteAccount />
                {access === 1 && <EraseAccount />}
            </ListGroup>
        </Card>
    )
}

export const DeleteAccount = () => {
    return (
        <ListGroup.Item>
            <SettingBlock title='Eliminar usuario'>
                Elimine la cuenta para que no pueda ser usada. El registro permanece en la base de datos y podrá volver a restaurarse, solo por orden del ADMINISTRADOR
                <SettingAction>
                    <DeleteUserSys />
                </SettingAction>
            </SettingBlock>
        </ListGroup.Item>
    )
}

export const EraseAccount = () => {
    return (
        <ListGroup.Item>
            <SettingBlock title='Borrar registro'>
                Una vez se borre el registro de la base de datos, no hay vuelta atrás. POR FAVOR ESTE SEGURO
                <SettingAction>
                    <EraseUserSys />
                </SettingAction>
            </SettingBlock>
        </ListGroup.Item>
    )
}