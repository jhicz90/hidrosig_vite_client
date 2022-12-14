import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNewGeometry } from '../../../store/actions'

export const SaveGeoObject = () => {

    const dispatch = useDispatch()
    const { featureCollection, isSavingNew } = useSelector(state => state.geoobject)

    return (
        <Button
            disabled={isSavingNew || featureCollection?.features.length === 0}
            variant='primary'
            onClick={() => {
                dispatch(startSaveNewGeometry())
            }}
        >
            Guardar
        </Button>
    )
}
