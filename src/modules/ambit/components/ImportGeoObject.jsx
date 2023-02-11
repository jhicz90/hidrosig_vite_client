import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { startImportShapes, startModalTempResource } from '../../../store/actions'

export const ImportGeoObject = () => {
    const dispatch = useDispatch()

    return (
        <Button
            variant='neutral'
            onClick={() => {
                dispatch(startModalTempResource({
                    groupTypesTemp: 'geodata',
                    setFilesTemp: (data) => dispatch(startImportShapes(data))
                }))
            }}
        >
            Importar
        </Button>
    )
}
