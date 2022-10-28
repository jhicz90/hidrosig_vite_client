import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaPen, FaTimes, FaTrashAlt } from 'react-icons/fa'
import { ChannelNetworkTree } from '../../../components'
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
                <div className="row">
                    <div className="col-12">
                        {
                            activeNode.id !== '' &&
                            <div className="input-group">
                                {/* <CreateStructure classNameBtn="btn btn-neutral" icon={true} /> */}
                                <button
                                    // onClick={handleClickDelete}
                                    className="btn btn-neutral ui-text-red">
                                    <FaTrashAlt />
                                </button>
                                {/* {
                                    activeNode.depth === 0
                                    &&
                                    <button
                                        onClick={handleClickSee}
                                        className="btn btn-neutral">
                                        Ver
                                    </button>
                                } */}
                                <Button
                                    // onClick={handleClickSeeDetail}
                                    variant='neutral'
                                >
                                    <FaPen />
                                </Button>
                                <span className="input-group-text">{activeNode.name}</span>
                                <button
                                    // onClick={handleClearNode}
                                    className="btn btn-neutral ui-text-red">
                                    <FaTimes />
                                </button>
                            </div>
                        }
                    </div>
                </div>
            }
            {
                (activeAmbit && activeAmbit !== '')
                && <ChannelNetworkTree juntaId={activeAmbit} />
            }
        </>
    )
}
