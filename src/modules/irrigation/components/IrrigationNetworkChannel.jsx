import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Col, Form, Row } from 'react-bootstrap'
import { ChannelNetworkTree } from '../../../components'
import { IrrigationNetworkActive } from './IrrigationNetworkActive'
import { setActiveAmbitIrrigationNetwork, useGetJuntasQuery } from '../../../store/actions'

export const IrrigationNetworkChannel = () => {

    const dispatch = useDispatch()
    const { activeAmbit, activeNode, isSaving } = useSelector(state => state.irrigationnetwork)
    const { data: optionsJunta = [], isLoading } = useGetJuntasQuery('', { refetchOnMountOrArgChange: true })

    return (
        <>
            <Form.Group as={Row} className='my-3 px-3' controlId='uSource'>
                <Form.Label column sm={12} md={2}>Junta de usuarios</Form.Label>
                <Col sm={12} md={10}>
                    <Form.Select
                        disabled={optionsJunta.length === 0 || isLoading}
                        value={activeAmbit}
                        onChange={({ target }) => dispatch(setActiveAmbitIrrigationNetwork(target.value))}
                        autoComplete='off'
                    >
                        <option value={''}>Seleccione la junta de usuarios</option>
                        {
                            optionsJunta.map(j => <option key={j._id} value={j._id}>{j.name}</option>)
                        }
                    </Form.Select>
                </Col>
            </Form.Group>
            {
                (activeAmbit && activeAmbit !== '')
                &&
                <ChannelNetworkTree juntaId={activeAmbit}>
                    <IrrigationNetworkActive />
                </ChannelNetworkTree>
            }
            <Outlet />
        </>
    )
}
