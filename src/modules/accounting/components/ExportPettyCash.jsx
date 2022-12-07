import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import { startExportActivePettyCash } from '../../../store/actions'

export const ExportPettyCash = ({ typeButton = 1 }) => {

    const dispatch = useDispatch()

    const handleExport = () => {
        dispatch(startExportActivePettyCash())
    }

    return (
        <Button
            variant={typeButton === 1 ? 'success' : 'link'}
            className='text-decoration-none'
            onClick={handleExport}
        >
            Exportar
        </Button>
    )
}