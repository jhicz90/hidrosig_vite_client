import React, { useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import { InputSearch, MapLocation, OptionGeometry } from '../../../components'
import { useLazyGetListPolygonQuery, useUpdateFarmByIdMutation } from '../../../store/actions'

export const AreaGeometryUpdateInAreaFarm = ({ farm = null }) => {

    const [show, setShow] = useState(false)
    const [typeLocation, setTypeLocation] = useState(0)
    const [search, setSearch] = useState('')
    const [range, setRange] = useState(20)
    const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 })
    const [searchArea, { data: optionsAreas = [], isFetching: isLoadingSearchArea }] = useLazyGetListPolygonQuery()
    const [updateFarm, { isLoading: isUpdating }] = useUpdateFarmByIdMutation()

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleUpdate = (feature) => {
        updateFarm({
            id: farm,
            farm: { feature }
        })
    }

    // const handleSave = async (newData) => {
    //     await addInputIrrigation(newData).unwrap()
    //         .then(() => newInputIrrigation(farm))
    // }

    // useEffect(() => {
    //     setTypeLocation(0)
    //     newInputIrrigation(farm)
    // }, [show])

    // useEffect(() => {
    //     reset({
    //         ...data
    //     })
    // }, [reset, data])

    return (
        <React.Fragment>
            <Button
                onClick={handleShow}
                variant='primary'
            >
                Cambiar superficie
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                size='lg'
                fullscreen='lg-down'
                backdrop='static'
                scrollable
            >
                <Modal.Header closeButton closeVariant='white'>
                    <div className='d-flex flex-column'>
                        <Modal.Title>Area geográfica #ACTUALIZAR</Modal.Title>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className='container-flex-stack'>
                        <InputSearch
                            value={search}
                            onChange={(e) => {
                                if (e.trim() !== '') searchArea(e)
                                setSearch(e)
                            }}
                            placeholder='Buscar areas...'
                            loading={isLoadingSearchArea}
                        />
                        {
                            optionsAreas.length > 0
                            &&
                            <div className='row row-cols-1 g-2'>
                                {
                                    // optionsAreas.filter(a => a._id !== feature?._id).map(area =>
                                    optionsAreas.map(area =>
                                        <div key={area._id} className='col'>
                                            <Card>
                                                <div className='row g-0'>
                                                    <div className='col-4'>
                                                        {
                                                            !!area
                                                            &&
                                                            <MapLocation
                                                                className='rounded-start'
                                                                geometry={
                                                                    [
                                                                        { ...area }
                                                                    ]
                                                                }
                                                                style={{
                                                                    height: '250px'
                                                                }}
                                                            />
                                                        }
                                                    </div>
                                                    <div className='col-8 d-flex flex-column justify-content-between'>
                                                        <div className='d-flex flex-column justify-content-between p-2 h-100'>
                                                            <OptionGeometry geo={area} />
                                                            <Button
                                                                onClick={() => {
                                                                    handleUpdate(area._id)
                                                                }}
                                                                disabled={isUpdating}
                                                                size='sm'
                                                                className='mt-2 w-100'
                                                            >
                                                                Seleccionar Area
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        </div>
                                    )
                                }
                            </div>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        disabled={isUpdating}
                        onClick={handleClose}
                        type='button'
                        variant='neutral'
                    >
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}
