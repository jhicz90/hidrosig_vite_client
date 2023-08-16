import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Button, Card } from 'react-bootstrap'
import { MdAddPhotoAlternate } from 'react-icons/md'
import { GridGallery } from '../../../components'
import { pettycashApi, startModalResource, startUpdateImageIdPettyCash } from '../../../store/actions'

export const PettyCashImages = () => {

    const { pettycashid } = useParams()
    const dispatch = useDispatch()
    const { data = null } = useSelector(pettycashApi.endpoints.getPettyCashById.select(pettycashid))

    const handleAddImage = (pettycash) => {

        const images = pettycash?.images?.length || 0
        const limit = 4 - images

        if (images < 4) {
            dispatch(startModalResource({
                tags: ['caja chica', `${pettycash.code}`, `${pettycash.name}`],
                groupTypes: 'images',
                limit,
                maxSize: 10,
                setFiles: (data) => dispatch(startUpdateImageIdPettyCash(pettycash._id, data))
            }))
        }
    }

    return (
        <React.Fragment>
            <Alert variant='info'>
                Ingrese las imagenes de los documentos escaneados, que se usaron para la creacion de esta caja chica como el cheque o depositos de excedente.
            </Alert>
            <GridGallery
                actionElement={
                    <Button
                        onClick={() => handleAddImage(data)}
                        variant='neutral'
                        className='align-items-center justify-content-center'
                    >
                        <MdAddPhotoAlternate size={40} />
                    </Button>
                }
                elements={data.images.map(i => ({ ...i, link: '/' }))} />
        </React.Fragment>
    )
}
