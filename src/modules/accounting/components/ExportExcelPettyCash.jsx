import { Button } from 'react-bootstrap'
import { FaRegFileExcel } from 'react-icons/fa'
import { usePettyCashStore } from '../../../hooks'

export const ExportExcelPettyCash = ({ pettycash = null }) => {

    const { exportExcel } = usePettyCashStore()

    const handleExportExcel = () => {
        exportExcel(pettycash)
    }

    return (
        <Button
            onClick={handleExportExcel}
            variant='neutral'
            size='sm'
            className='d-flex align-items-center gap-2'
        >
            <FaRegFileExcel color='green' />
            Exportar EXCEL
        </Button>
    )
}