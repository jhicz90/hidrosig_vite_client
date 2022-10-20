import { useSelector } from 'react-redux'
import { Col, Form, Row } from 'react-bootstrap'
import { FcSearch } from 'react-icons/fc'
import { ChannelNetworkTree } from '../../../components'
import { setActiveAmbitIrrigationNetwork, useGetJuntasQuery } from '../../../store/actions'

export const IrrigationNetworkChannel = () => {

    const { activeAmbit, isSaving } = useSelector(state => state.irrigationnetwork)
    const { data: optionsJunta = [], isLoading } = useGetJuntasQuery('', { refetchOnMountOrArgChange: true })

    return (
        <>
            <Form.Group as={Row} className='my-3 px-3 gx-2' controlId='search'>
                <Form.Label column xs={'auto'} >
                    <FcSearch size={24} />
                </Form.Label>
                <Col>
                    <Form.Select
                        disabled={optionsJunta.length === 0 || isLoading}
                        value={activeAmbit || ''}
                        onChange={({ target }) => setActiveAmbitIrrigationNetwork(target.value)}
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
                activeAmbit
                && <ChannelNetworkTree junta={activeAmbit} search={valueSearch} showCheckbox={false} />
            }
        </>
    )
}
