import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import { startExportExcelActivePettyCash } from '../../../store/actions'

export const ExportExcelPettyCash = ({ typeButton = 1 }) => {

    const { pettycashid } = useParams()
    const dispatch = useDispatch()

    const handleExport = () => {
        dispatch(startExportExcelActivePettyCash(pettycashid))
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