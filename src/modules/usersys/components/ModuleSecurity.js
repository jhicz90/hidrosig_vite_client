import React from 'react'
import { useSelector } from 'react-redux'
import { ListGroup, Card } from 'react-bootstrap'
import { ChangePermission } from './changePermission'
import { SettingAction, SettingBlock } from '../../../components'

export const UserSysSecurityModule = () => {
    return (
        <Card>
            <ListGroup variant="flush">
                <SecurityPermission />
            </ListGroup>
        </Card>
    )
}

const SecurityPermission = () => {

    const { active } = useSelector(state => state.usersys)
    const { permission } = active

    return (
        <>
            <ListGroup.Item>
                <SettingBlock title='Permiso'>
                    {
                        permission !== null
                            ? <div className="d-flex flex-column">
                                <div>{permission.name}</div>
                                <div>Nivel de acceso: {permission.levelOrg}</div>
                                {permission.levelOrg > 1 && <div>Junta: {permission.junta.name}</div>}
                                {permission.levelOrg === 3 && <div>Comision(es): {permission.committee.map(c => c.name).join(', ')}</div>}
                            </div>
                            : 'Sin permiso'
                    }
                    <SettingAction>
                        <ChangePermission />
                    </SettingAction>
                </SettingBlock>
            </ListGroup.Item>
        </>
    )
}