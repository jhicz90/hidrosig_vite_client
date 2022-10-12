import { useSelector } from 'react-redux'
import { Card, ListGroup } from 'react-bootstrap'
import { useGetWaterSourcesQuery, useGetZonesForJuntaQuery } from '../../../store'
import { SettingAction, SettingBlock } from '../../../components'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export const JuntaModuleAmbit = () => {
    return (
        <Card>
            <ListGroup variant="flush">
                <JuntaZone />
                <JuntaSource />
                {/* <JuntaComms /> */}
            </ListGroup>
        </Card>
    )
}

const JuntaZone = () => {

    const [search, setSearch] = useState('')
    const { active: { _id: juntaId } } = useSelector(state => state.junta)
    const { data: zonesIn = [], isLoading } = useGetZonesForJuntaQuery({ junta: juntaId, search }, { refetchOnMountOrArgChange: true })
    return (
        <>
            <ListGroup.Item>
                <SettingBlock title='Zonas'>
                    {
                        zonesIn.length > 0
                            ?
                            zonesIn.map((z, i) =>
                                <div key={z._id} className="d-inline">
                                    <Link
                                        to={`/app/ambit/trrty/zone/${z._id}`}
                                        className="link-primary text-decoration-none"
                                    >{z.name}</Link>{(i + 1 % 2 !== 0 && zonesIn.length > 1 && zonesIn.length !== i + 1) && <strong>, </strong>}
                                </div>
                            )
                            :
                            'No ahi zonas asociadas a esta junta de usuarios'
                    }
                </SettingBlock>
            </ListGroup.Item>
        </>
    )
}

const JuntaSource = () => {

    const [search, setSearch] = useState('')
    const { active: { _id: juntaId } } = useSelector(state => state.junta)
    const { data: waterSourcesIn = [], isLoading } = useGetWaterSourcesQuery({ junta: juntaId, search }, { refetchOnMountOrArgChange: true })
    return (
        <>
            <ListGroup.Item>
                <SettingBlock title='Fuentes de agua'>
                    {
                        waterSourcesIn.length > 0
                            ?
                            waterSourcesIn.map((z, i) =>
                                <div key={z._id} className="d-inline">
                                    <img src='https://img.icons8.com/color/512/dam.png' width={32} height={32} />
                                    <Link
                                        to={`/app/ambit/trrty/zone/${z._id}`}
                                        className="link-primary text-decoration-none"
                                    >{z.name}</Link>{(i + 1 % 2 !== 0 && waterSourcesIn.length > 1 && waterSourcesIn.length !== i + 1) && <strong>, </strong>}
                                </div>
                            )
                            :
                            'No ahi fuentes de agua asociadas a esta junta de usuarios'
                    }
                </SettingBlock>
            </ListGroup.Item>
        </>
    )
}