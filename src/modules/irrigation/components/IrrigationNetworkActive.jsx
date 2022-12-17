import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, ButtonGroup, Card, Form, ListGroup, Offcanvas } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import { FaTimes } from 'react-icons/fa'
import { DatePicker, InputMask } from '../../../components'
import { clearActiveNodeIrrigationNetwork, setActiveNodeDataIrrigationNetwork, startGetActiveIrrigationNetwork, startUpdateDataStructureInIrrigNet, startUpdateDataWaterSourceInIrrigNet } from '../../../store/actions'
import { useNavigate } from 'react-router-dom'

export const IrrigationNetworkActive = ({ typeButton = 1 }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
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
                                navigate(`/app/schm/irrig/edit/watersource/${id}`)
                            } else {
                                navigate(`/app/schm/irrig/edit/structure/${id}`)
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
