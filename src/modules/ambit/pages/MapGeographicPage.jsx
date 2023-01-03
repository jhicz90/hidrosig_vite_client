import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { MapGeoObject } from '..'
import { clearToolbarActions, setToolbarActions, setToolbarTitle } from '../../../store/actions'

export const MapGeographicPage = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearToolbarActions())
        dispatch(setToolbarTitle('MAPA GEOGRAFICO'))
        // dispatch(setToolbarActions(
        //     <>
        //         <CreateZone />
        //         <CreateBlock />
        //     </>
        // ))

        return () => {
            dispatch(clearToolbarActions())
        }
    }, [dispatch])

    return (
        <MapGeoObject />
    )
}
