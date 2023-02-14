import { Button, Card, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { FileImageSlider, SettingAction, SettingBlock } from '../../../components'
import { startDeleteImagePettyCash, startModalResource, startUpdateImageIdPettyCash } from '../../../store/actions'

export const PettyCashModuleImages = () => {
    return (
        <Card>
            <ListGroup variant='flush'>
                <PettyCashImages />
            </ListGroup>
        </Card>
    )
}

const PettyCashImages = () => {

    const dispatch = useDispatch()
    const { active } = useSelector(state => state.pettycash)

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

    const handleDeleteImagePettyCash = (imageId) => {
        dispatch(startDeleteImagePettyCash(active._id, imageId))
    }

    return (
        <>
            <SettingBlock
                title='Imagenes'
                // loading={isLoading}
                action={
                    <SettingAction>
                        <Button
                            onClick={() => handleAddImage(active)}
                            variant='neutral'
                            className='text-primary text-decoration-none'
                        >
                            Agregar imagen
                        </Button>
                    </SettingAction>
                }
                list={
                    <>
                        <FileImageSlider images={active.images} actionDelete={handleDeleteImagePettyCash} />
                    </>
                }
            >
                {active?.images?.length || 0}
            </SettingBlock>
        </>
        // <Card>
        //     <Card.Body>
        //         <div className='row'>
        //             <div className='col'>
        //                 <Form.Group className='mb-3' controlId='pImages'>
        //                     <Form.Label>Imagenes</Form.Label>
        //                     <ListGroup>
        //                         <ListGroup.Item onClick={() => handleAddImage(active)} className='d-flex align-items-center' action>
        //                             Agregar imagen <IoMdAddCircleOutline className='ms-2' size={20} color='green' />
        //                         </ListGroup.Item>
        //                         <ListGroup.Item className='bg-light'>
        //                             <FileImageSlider images={active.images} actionDelete={handleDeleteImagePettyCash} />
        //                         </ListGroup.Item>
        //                     </ListGroup>
        //                 </Form.Group>
        //             </div>
        //         </div>
        //     </Card.Body>
        // </Card>
    )
}
