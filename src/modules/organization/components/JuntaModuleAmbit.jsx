import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Card, ListGroup } from 'react-bootstrap'
import { useGetWaterSourcesQuery, useGetZonesForJuntaQuery } from '../../../store'
import { SettingAction, SettingBlock } from '../../../components'
import { CreateZone } from '../../territories'

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

    const { active: { _id: juntaId } } = useSelector(state => state.junta)
    const { data: zonesIn = [], isLoading } = useGetZonesForJuntaQuery({ junta: juntaId, search: '' }, { refetchOnMountOrArgChange: true })

    return (
        <SettingBlock
            title='Zonas'
            loading={isLoading}
            action={
                <SettingAction>
                    <CreateZone />
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

    const { active: { _id: juntaId } } = useSelector(state => state.junta)
    const { data: waterSourcesIn = [], isLoading } = useGetWaterSourcesQuery({ junta: juntaId, search: '' }, { refetchOnMountOrArgChange: true })
    return (
        <SettingBlock
            title='Fuentes de agua'
            loading={isLoading}
            action={
                <SettingAction>
                    <Button variant='neutral'>Agregar fuentes de agua</Button>
                </SettingAction>
            }
            list={
                waterSourcesIn.length > 0 || isLoading
                    ?
                    waterSourcesIn.map((ws, i) =>
                        <ListGroup.Item key={ws._id}>
                            {
                                {
                                    1: <img className='me-2' src='https://img.icons8.com/color/512/dam.png' width={36} height={36} />,
                                    6: <img className='me-2' src='https://img.icons8.com/color/512/valley.png' width={36} height={36} />,
                                }[ws.type]
                            }
                            <Link
                                to={`/app/ambit/trrty/watersource/${ws._id}`}
                                className='link-primary text-decoration-none'
                            >{ws.name}</Link>
                        </ListGroup.Item>
                    )
                    :
                    <p className='mx-3'>No ahi fuentes de agua asociadas a esta junta de usuarios</p>
            }
        // waterSourcesIn.length > 0
        //     ?
        //     waterSourcesIn.map((ws, i) =>
        //         <Button variant='neutral' size='sm' className='me-1'>
        //             <img src='https://img.icons8.com/color/512/dam.png' width={32} height={32} />
        //             <img src='https://img.icons8.com/color/512/rain--v1.png' width={32} height={32} />
        //             <img src='https://img.icons8.com/color/512/lake.png' width={32} height={32} />
        //             <img src='https://img.icons8.com/color/512/hand-dug-well.png' width={32} height={32} />
        //             <img src='https://img.icons8.com/color/512/pumphouse.png' width={32} height={32} />
        //             <img src='https://img.icons8.com/color/512/valley.png' width={32} height={32} />
        //             <img src='https://img.icons8.com/color/512/water-treatment-plant.png' width={32} height={32} />
        //             https://img.icons8.com/color/512/swamp.png
        //             https://img.icons8.com/color/512/flow.png
        //             <Link
        //                 to={`/app/ambit/trrty/watersource/${ws._id}`}
        //                 className='link-primary text-decoration-none'
        //             >

        //                 {
        //                     {
        //                         1: <img className='me-2' src='https://img.icons8.com/color/512/dam.png' width={36} height={36} />,
        //                         6: <img className='me-2' src='https://img.icons8.com/color/512/valley.png' width={36} height={36} />,
        //                     }[ws.type]
        //                 }
        //                 {ws.name}
        //             </Link>
        //             {
        //                 {
        //                     1: <img className='me-2' src='https://img.icons8.com/color/512/dam.png' width={36} height={36} />,
        //                     6: <img className='me-2' src='https://img.icons8.com/color/512/valley.png' width={36} height={36} />,
        //                 }[ws.type]
        //             }
        //             {ws.name}
        //         </Button>
        //     )
        //     :
        //     'No ahi fuentes de agua asociadas a esta junta de usuarios'
        />
    )
}