import { GrMapLocation } from 'react-icons/gr'
import { FaRulerCombined, FaRulerHorizontal } from 'react-icons/fa6'
import { area, length } from '@turf/turf'
import { MapEdit } from '../../../components'
import { useGeoObjectStore } from '../../../hooks'
import { ViewModalGeoObject, ImportGeoObject } from '.'

export const MapGeoObject = () => {

    const { featureCollection } = useGeoObjectStore()
    
    return (
        <>
            <div className='container-fluid'>
                <div className='d-lg-flex align-items-lg-center justify-content-lg-between my-3'>
                    <div className='min-w-0 flex-1'>
                        <h4 className='mb-0 text-uppercase'>MAPA Y OBJETOS GEOGRAFICOS</h4>
                        <div className='mt-1 mt-sm-0 d-flex flex-column flex-sm-row gap-0 gap-sm-4'>
                            <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                                <GrMapLocation size={20} />
                                {
                                    `${featureCollection.features.length} objetos`
                                }
                            </div>
                            <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                                <FaRulerCombined size={20} />
                                {
                                    `${(featureCollection.features
                                        .reduce((accumulator, currentValue) => accumulator + area(currentValue.geometry), 0) / 10000).toFixed(2)
                                    } ha`
                                }
                            </div>
                            <div className='mt-2 d-flex align-items-center gap-1 text-muted'>
                                <FaRulerHorizontal size={20} />
                                {
                                    `${(featureCollection.features.filter(f => f.geometry.type === 'LineString')
                                        .reduce((accumulator, currentValue) => accumulator + length(currentValue.geometry, { units: 'kilometers' }), 0)).toFixed(2)
                                    } km`
                                }
                            </div>
                        </div>
                    </div>
                    <div className='mt-3 ms-lg-5 mt-lg-0 d-flex gap-2 flex-wrap'>
                        <ImportGeoObject />
                        <ViewModalGeoObject />
                    </div>
                </div>
            </div>
            <div className='row g-0'>
                <div className='col-12'>
                    <div className='container-fluid p-0'>
                        <div className='row g-0'>
                            <div className='col-12'>
                                <MapEdit />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}