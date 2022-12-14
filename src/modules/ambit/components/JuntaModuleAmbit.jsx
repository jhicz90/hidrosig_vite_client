import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, ListGroup } from 'react-bootstrap'
import { useGetCommsByJuntaQuery, useGetWaterSourcesByJuntaQuery, useGetZonesByJuntaQuery } from '../../../store/actions'
import { SettingAction, SettingBlock, TypeWaterSource } from '../../../components'
import { CreateZone, CreateCommittee } from '.'
import { CreateWaterSource } from '../../'

export const JuntaModuleAmbit = () => {
    return (
        <Card>
            <ListGroup variant='flush'>
                <JuntaZone />
                <JuntaWaterSource />
                <JuntaCommittee />
            </ListGroup>
        </Card>
    )
}

const JuntaZone = () => {

    const { active } = useSelector(state => state.junta)
    const { data: zonesIn = [], isLoading } = useGetZonesByJuntaQuery({ junta: active._id, search: '' }, { refetchOnMountOrArgChange: true })

    return (
        <SettingBlock
            title='Zonas'
            loading={isLoading}
            colorBlock='rgba(0,0,0,0.08)'
            action={
                <SettingAction>
                    <CreateZone junta={active} />
                </SettingAction>
            }
            list={
                zonesIn.length > 0 || isLoading
                    ?
                    zonesIn.map((z, i) =>
                        <ListGroup.Item key={z._id}>
                            <Link
                                to={`/app/ambit/trrty/zone/${z._id}`}
                                className='link-primary text-decoration-none'
                            >{z.name}</Link>
                        </ListGroup.Item>
                    )
                    :
                    <p className='mx-3'>No ahi zonas asociadas a esta junta de usuarios</p>
            }
        />
    )
}

const JuntaWaterSource = () => {

    const { active } = useSelector(state => state.junta)
    const { data: waterSourcesIn = [], isLoading } = useGetWaterSourcesByJuntaQuery({ junta: active._id, search: '' }, { refetchOnMountOrArgChange: true })

    return (
        <SettingBlock
            title='Fuentes de agua'
            loading={isLoading}
            colorBlock='rgba(0,0,0,0.08)'
            action={
                <SettingAction>
                    <CreateWaterSource junta={active} />
                </SettingAction>
            }
            list={
                waterSourcesIn.length > 0 || isLoading
                    ?
                    waterSourcesIn.map((ws, i) =>
                        <ListGroup.Item key={ws._id}>
                            <TypeWaterSource type={ws.type} />
                            <Link
                                to={`/app/ambit/trrty/watersource/${ws._id}`}
                                className='link-primary text-decoration-none ms-2'
                            >{ws.name}</Link>
                        </ListGroup.Item>
                    )
                    :
                    <p className='mx-3'>No ahi fuentes de agua asociadas a esta junta de usuarios</p>
            }
        />
    )
}

const JuntaCommittee = () => {

    const { active } = useSelector(state => state.junta)
    const { data: committeesIn = [], isLoading } = useGetCommsByJuntaQuery({ junta: active._id, search: '' }, { refetchOnMountOrArgChange: true })
    
    return (
        <SettingBlock
            title='Comisiones de usuario'
            loading={isLoading}
            colorBlock='rgba(0,0,0,0.08)'
            action={
                <SettingAction>
                    <CreateCommittee junta={active} />
                </SettingAction>
            }
            list={
                committeesIn.length > 0 || isLoading
                    ?
                    committeesIn.map((cm, i) =>
                        <ListGroup.Item key={cm._id}>
                            <Link
                                to={`/app/ambit/orgz/comm/${cm._id}`}
                                className='link-primary text-decoration-none'
                            >{cm.name}</Link>
                        </ListGroup.Item>
                    )
                    :
                    <p className='mx-3'>No ahi comisiones de usuarios asociadas a esta junta de usuarios</p>
            }
        />
    )
}