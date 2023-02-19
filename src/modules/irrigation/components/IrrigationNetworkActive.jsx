import { useDispatch, useSelector } from 'react-redux'
import { Button, ButtonGroup } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'
import { clearActiveNodeIrrigationNetwork } from '../../../store/actions'
import { useLocation, useNavigate } from 'react-router-dom'

export const IrrigationNetworkActive = ({ typeButton = 1 }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { activeNode: { id, name, depth, data, loading } } = useSelector(state => state.irrigationnetwork)

    return (
        <>
            {
                !!id
                &&
                <ButtonGroup>
                    <Button
                        disabled={loading}
                        variant={typeButton === 1 ? 'neutral' : 'link'}
                        className='text-primary text-decoration-none'
                        onClick={() => {
                            if (depth === 0) {
                                navigate(`/app/schm/irrig/ws/edit/${id}`, { state: { from: location } })
                            } else {
                                navigate(`/app/schm/irrig/net/edit/${id}`, { state: { from: location } })
                            }
                        }}
                    >
                        {name}
                    </Button>
                    <Button
                        variant='neutral'
                        className='d-flex align-items-center'
                        onClick={() => {
                            dispatch(clearActiveNodeIrrigationNetwork())
                        }}
                    >
                        <FaTimes size={20} />
                    </Button>
                </ButtonGroup>
            }
        </>
    )
}
