import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'
import { GridGallery } from '@/components'
import { channelApi, startModalResource, startUpdateImageIdFarm, useGetChannelByIdQuery } from '@/store/actions'

export const ChannelImages = () => {

    const { chnid } = useParams()
    const dispatch = useDispatch()
    // const { questionDeleteResourcePettyCash } = usePettyCashStore()
    const { data = null } = useSelector(channelApi.endpoints.getChannelById.select(chnid))

    const handleAddImage = (channel) => {
        dispatch(startModalResource({
            tags: ['estructura', channel.name],
            groupTypes: 'images',
            limit: 6,
            maxSize: 10,
            setFiles: (data) => dispatch(startUpdateImageIdFarm(chnid, data))
        }))
    }

    return (
        <React.Fragment>
            <div className='container-flex-stack'>
                <Alert variant='info'>
                    Ingrese imagenes de caracter informativo de como es la estructura.
                </Alert>
                <GridGallery
                    actionAdd={() => handleAddImage(data)}
                    // actionDelete={(resource) => questionDeleteResourcePettyCash(data, resource)}
                    elements={data.images.map(i => ({ ...i, link: '/' }))}
                />
            </div>
        </React.Fragment>
    )
}
