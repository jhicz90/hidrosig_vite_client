import { Button } from 'react-bootstrap'
import { FaFileImport } from 'react-icons/fa'
import { useGeoObjectStore, useResourceStore } from '../../../hooks'

export const ImportGeoObject = () => {

    const { initResourceTemp } = useResourceStore()
    const { importShapes } = useGeoObjectStore()

    return (
        <Button
            onClick={() => {
                initResourceTemp({
                    groupTypes: 'geodata',
                    setFiles: importShapes
                })
            }}
            variant='neutral'
            size='sm'
            className='d-flex align-items-center gap-2'
        >
            <FaFileImport />
            Importar
        </Button>
    )
}
