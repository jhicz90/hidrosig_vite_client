import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Alert } from 'react-bootstrap'
import { GridGallery } from '../../../components'
import { usePettyCashStore } from '../../../hooks'
import { startModalResource, startUpdateImageIdPettyCash, useGetPettyCashByIdQuery } from '../../../store/actions'

export const PettyCashImages = () => {

    const { pettycashid } = useParams()
    const dispatch = useDispatch()
    const { questionDeleteResourcePettyCash } = usePettyCashStore()
    const { data = null } = useGetPettyCashByIdQuery(pettycashid)

    const handleAddImage = (pettycash) => {

        const images = pettycash?.images?.length || 0
        const limit = 4 - images

        if (images < 4) {
            dispatch(startModalResource({
                tags: ['caja chica', `${pettycash.code}`, `${pettycash.name}`],
                groupTypes: 'images',
                limit,
                maxSize: 10,
                setFiles: (data) => dispatch(startUpdateImageIdPettyCash(pettycashid, data))
            }))
        }
    }

    return (
        <React.Fragment>
            <div className='container-flex-stack'>
                <Alert variant='info'>
                    Ingrese las imagenes de los documentos escaneados, que se usaron para la creacion de esta caja chica como el cheque o depositos de excedente.
                </Alert>
                <GridGallery
                    actionAdd={() => handleAddImage(data)}
                    actionDelete={(resource) => questionDeleteResourcePettyCash(data, resource)}
                    elements={data.images.map(i => ({ ...i, link: '/' }))}
                />
            </div>
        </React.Fragment>
    )
}
