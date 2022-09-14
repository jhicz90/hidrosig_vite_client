import React from 'react'
import { useSelector } from 'react-redux'
import { Card, ListGroup } from 'react-bootstrap'
import { Table, Column, HeaderCell, Cell } from 'rsuite-table'
import { useDispatch } from 'react-redux'
import { startUpdateActiveUserSysCloseAllSession, startUpdateActiveUserSysCloseSessionRemote } from '../../../actions'
import { SettingAction, SettingBlock } from '../../../components'
import { formatAgoDate } from '../../../helpers'

export const UserSysSessionModule = () => {
    return (
        <Card>
            <ListGroup variant='flush'>
                <LogsAccess />
            </ListGroup>
        </Card>
    )
}

const LogsAccess = () => {

    const dispatch = useDispatch()
    const { session } = useSelector(state => state.auth)
    const { active } = useSelector(state => state.usersys)

    const logs = [...active.logs].sort((a, b) => new Date(b.loginDate) - new Date(a.loginDate))

    const handleCloseSession = (session) => {
        dispatch(startUpdateActiveUserSysCloseSessionRemote({ session }))
    }

    const handleCloseAllSession = () => {
        dispatch(startUpdateActiveUserSysCloseAllSession())
    }

    return (
        <>
            <ListGroup.Item>
                <SettingBlock title='Accesos'>
                    {''}
                    <SettingAction>
                        <button
                            disabled={active.logs.length === 0}
                            onClick={handleCloseAllSession}
                            className="btn btn-neutral fw-bolder px-3"
                        >
                            Cerrar todas las sesiones
                        </button>
                    </SettingAction>
                </SettingBlock>
            </ListGroup.Item>
            <Table
                virtualized
                data={logs}
                height={500}
                renderEmpty={() => {
                    return (
                        <div className="rs-table-body-info">
                            <span className="alert alert-info">No ahi logueos recientes</span>
                        </div>
                    )
                }}
            >
                <Column width={120} resizable>
                    <HeaderCell>ID SESIÓN</HeaderCell>
                    <Cell>
                        {(rowData) => {
                            return <>{`#${rowData.session.slice(-6).toUpperCase()}`}</>
                        }}
                    </Cell>
                </Column>
                <Column width={100} resizable>
                    <HeaderCell>NAVEGADOR</HeaderCell>
                    <Cell dataKey='browser' />
                </Column>
                <Column width={100} resizable>
                    <HeaderCell>SISTEMA</HeaderCell>
                    <Cell dataKey='os' />
                </Column>
                <Column width={250} resizable>
                    <HeaderCell>IP</HeaderCell>
                    <Cell dataKey="ip" />
                </Column>
                <Column width={150} resizable>
                    <HeaderCell>FECHA SESIÓN</HeaderCell>
                    <Cell>
                        {(rowData) => {
                            return <>{formatAgoDate(rowData.loginDate)}</>
                        }}
                    </Cell>
                </Column>
                <Column width={150} resizable>
                    <HeaderCell>FECHA DESLOGUEO</HeaderCell>
                    <Cell>
                        {(rowData) => {
                            return <>{formatAgoDate(rowData.logoutDate)}</>
                        }}
                    </Cell>
                </Column>
                <Column width={150} fixed='right'>
                    <HeaderCell>ACCIÓN</HeaderCell>
                    <Cell>
                        {rowData => {
                            return (
                                <>
                                    {
                                        rowData.session === session
                                            ?
                                            <span className="ui-text-blue fw-bold">Sesión actual</span>
                                            : rowData.logoutDate === null
                                                ?
                                                <button
                                                    onClick={() => handleCloseSession(rowData.session)}
                                                    className="btn btn-sm btn-neutral text-danger"
                                                >
                                                    <i className="fas fa-sign-out-alt me-1" />
                                                    Cerrar sesión
                                                </button>
                                                :
                                                <span className="ui-text-red fw-bold">Sesión cerrada</span>
                                    }
                                </>
                            );
                        }}
                    </Cell>
                </Column>
            </Table>
        </>
    )
}