import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Alert } from 'react-bootstrap'
import { GridGallery } from '@/components'
import { useFarmStore } from '@/hooks'
import { startModalResource, startUpdateImageIdFarm, useGetFarmByIdQuery } from '@/store/actions'

export const AreaFarmImages = () => {

    const { prpid } = useParams()
    const dispatch = useDispatch()
    const { questionDeleteResourceFarm } = useFarmStore()
    const { data = null } = useGetFarmByIdQuery(prpid)

    const handleAddImage = (farm) => {
        dispatch(startModalResource({
            tags: ['predio', `${farm.code}`, `${farm.name}`],
            groupTypes: 'images',
            limit: 10,
            maxSize: 10,
            setFiles: (data) => dispatch(startUpdateImageIdFarm(farm._id, data))
        }))
    }

    return (
        <React.Fragment>
            <div className='container-flex-stack'>
                <Alert variant='info'>
                    Ingrese imagenes de caracter informativo de como es o como se encuentra el predio.
                </Alert>
                <GridGallery
                    actionAdd={() => handleAddImage(data)}
                    actionDelete={(resource) => questionDeleteResourceFarm(data, resource)}
                    elements={data.images.map(i => ({ ...i, link: '/' }))}
                />
            </div>
        </React.Fragment>
    )
}
