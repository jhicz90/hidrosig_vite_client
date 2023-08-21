import { Button } from 'react-bootstrap'
import { FaRegFilePdf } from 'react-icons/fa'
import { usePettyCashStore } from '../../../hooks'

export const ExportPdfPettyCash = ({ pettycash = null }) => {

    const { exportPDF } = usePettyCashStore()

    const handleExportPDF = () => {
        exportPDF(pettycash)
    }

    return (
        <Button
            onClick={handleExportPDF}
            variant='neutral'
            size='sm'
            className='d-flex align-items-center gap-2'
        >
            <FaRegFilePdf color='red' />
            Exportar Comprobantes
        </Button>
    )
}