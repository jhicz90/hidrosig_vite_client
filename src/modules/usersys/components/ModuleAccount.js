import React from 'react'
import { useSelector } from 'react-redux'
import { ListGroup, Card } from 'react-bootstrap'
import { ChangeUsername } from './changeUsername'
import { ChangeEmail } from './changeEmail'
import { ChangePassword } from './changePassword'
import { GeneratePassword } from './generatePassword'
import { SettingAction, SettingBlock } from '../../../components'

export const UserSysAccountModule = () => {
    return (
        <Card>
            <ListGroup variant="flush">
                <AccountUsername />
                <AccountEmail />
                <AccountPassword />
            </ListGroup>
        </Card>
    )
}

const AccountUsername = () => {

    const { active } = useSelector(state => state.usersys)
    const { username } = active

    return (
        <>
            <ListGroup.Item>
                <SettingBlock title='Nombre de usuario'>
                    {username}
                    <SettingAction>
                        <ChangeUsername />
                    </SettingAction>
                </SettingBlock>
            </ListGroup.Item>
        </>
    )
}

const AccountEmail = () => {

    const { active } = useSelector(state => state.usersys)
    const { email } = active

    return (
        <>
            <ListGroup.Item>
                <SettingBlock title='Correo electrónico'>
                    {email}
                    <SettingAction>
                        <ChangeEmail />
                    </SettingAction>
                </SettingBlock>
            </ListGroup.Item>
        </>
    )
}

const AccountPassword = () => {

    const { uid } = useSelector(state => state.auth)
    const { active } = useSelector(state => state.usersys)

    return (
        <>
            <ListGroup.Item>
                <SettingBlock title='Contraseña'>
                    ************
                    <SettingAction>
                        {
                            active._id === uid
                                ?
                                <ChangePassword />
                                :
                                <GeneratePassword />
                        }
                    </SettingAction>
                </SettingBlock>
            </ListGroup.Item>
        </>
    )
}