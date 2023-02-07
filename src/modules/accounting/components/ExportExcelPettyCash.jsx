import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import { startExportExcelActivePettyCash } from '../../../store/actions'

export const ExportExcelPettyCash = ({ typeButton = 1 }) => {

    const dispatch = useDispatch()

    const handleExport = () => {
        dispatch(startExportExcelActivePettyCash())
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