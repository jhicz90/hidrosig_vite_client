import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import { startExportPdfActivePettyCash } from '../../../store/actions'

export const ExportPdfPettyCash = ({ typeButton = 1 }) => {

    const { pettycashid } = useParams()
    const dispatch = useDispatch()

    const handleExport = () => {
        dispatch(startExportPdfActivePettyCash(pettycashid))
    }

    return (
        <Button
            variant={typeButton === 1 ? 'secondary' : 'link'}
            className='text-decoration-none'
            onClick={handleExport}
        >
            Exportar comprobantes
        </Button>
    )
}