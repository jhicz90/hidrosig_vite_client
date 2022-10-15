import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, ListGroup } from 'react-bootstrap'
import { useGetWaterSourcesForJuntaQuery, useGetZonesForJuntaQuery } from '../../../store/actions'
import { SettingAction, SettingBlock, TypeWaterSource } from '../../../components'
import { CreateZone, CreateWaterSource } from '.'

export const JuntaModuleAmbit = () => {
    return (
        <Card>
            <ListGroup variant='flush'>
                <JuntaZone />
                <JuntaSource />
                {/* <JuntaComms /> */}
            </ListGroup>
        </Card>
    )
}

const JuntaZone = () => {

    const { active } = useSelector(state => state.junta)
    const { data: zonesIn = [], isLoading } = useGetZonesForJuntaQuery({ junta: active._id, search: '' }, { refetchOnMountOrArgChange: true })

    return (
        <SettingBlock
            title='Zonas'
            loading={isLoading}
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

const JuntaSource = () => {

    const { active } = useSelector(state => state.junta)
    const { data: waterSourcesIn = [], isLoading } = useGetWaterSourcesForJuntaQuery({ junta: active._id, search: '' }, { refetchOnMountOrArgChange: true })
    return (
        <SettingBlock
            title='Fuentes de agua'
            loading={isLoading}
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
                                className='link-primary text-decoration-none'
                            >{ws.name}</Link>
                        </ListGroup.Item>
                    )
                    :
                    <p className='mx-3'>No ahi fuentes de agua asociadas a esta junta de usuarios</p>
            }
        />
    )
}