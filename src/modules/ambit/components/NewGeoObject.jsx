import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { clearFeatureCollection } from '../../../store/actions'

export const NewGeoObject = () => {

    const dispatch = useDispatch()

    return (
        <Button
            variant='success'
            onClick={() => {
                dispatch(clearFeatureCollection())
            }}
        >
            Nuevo objeto
        </Button>
    )
}
