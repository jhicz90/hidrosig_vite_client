import { Badge, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FaCheck, FaHourglassEnd, FaLock } from 'react-icons/fa'
import { useUpdateOpClYearRateByIdMutation, } from '../../../store/actions'

export const TagOpened = ({ yearRateId = '', opened }) => {

    const [updateOpCl, { isLoading }] = useUpdateOpClYearRateByIdMutation()

    const renderTooltip = (props) => (
        <Tooltip {...props} className='text-start'>
            Al dar click en esta etiqueta aperturara la campaña, y cerrara la activa si es que ahi alguna activada
        </Tooltip>
    )

    const handleOpened = async () => {
        try {
            await updateOpCl({ id: yearRateId, openclose: 'opened' })
        } catch (err) {
            console.log(err)
        }
    }

    const handleClosed = async () => {
        try {
            await updateOpCl({ id: yearRateId, openclose: 'closed' })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {
                opened
                    ?
                    <>
                        {
                            isLoading
                                ?
                                <Badge
                                    bg='secondary'
                                    pill
                                    className='d-inline-flex px-2 py-1 animate__animated animate__fadeIn'
                                >
                                    <FaHourglassEnd className='me-1' />Cerrando
                                </Badge>
                                :
                                <Badge
                                    onClick={handleClosed}
                                    bg='success'
                                    pill
                                    className='d-inline-flex px-2 py-1'
                                    style={{ cursor: 'pointer' }}
                                >
                                    <FaCheck className='me-1' />Aperturado
                                </Badge>
                        }
                    </>
                    :
                    <>
                        {
                            isLoading
                                ?
                                <Badge
                                    bg='success'
                                    pill
                                    className='d-inline-flex px-2 py-1 animate__animated animate__fadeIn'
                                >
                                    <FaHourglassEnd className='me-1' />Aperturando
                                </Badge>
                                :
                                <OverlayTrigger
                                    placement='auto'
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip}
                                >
                                    <Badge
                                        onClick={handleOpened}
                                        bg='secondary'
                                        pill
                                        className='d-inline-flex px-2 py-1'
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <FaLock className='me-1' />
                                        Cerrado
                                    </Badge>
                                </OverlayTrigger>

                        }
                    </>
            }
        </>
    )
}