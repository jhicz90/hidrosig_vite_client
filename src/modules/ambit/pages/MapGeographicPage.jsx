import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { MapGeoObject, NewGeoObject } from '..'
import { clearToolbarActions, setToolbarActions, setToolbarTitle } from '../../../store/actions'
import { SaveGeoObject } from '../components/SaveGeoObject'

export const MapGeographicPage = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearToolbarActions())
        dispatch(setToolbarTitle('MAPA GEOGRAFICO'))
        dispatch(setToolbarActions(
            <>
                <NewGeoObject />
                <SaveGeoObject />
            </>
        ))

        return () => {
            dispatch(clearToolbarActions())
        }
    }, [dispatch])

    return (
        <MapGeoObject />
    )
}
