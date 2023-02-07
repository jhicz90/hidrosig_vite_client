import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import { startExportPdfActivePettyCash } from '../../../store/actions'

export const ExportPdfPettyCash = ({ typeButton = 1 }) => {

    const dispatch = useDispatch()

    const handleExport = () => {
        dispatch(startExportPdfActivePettyCash())
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