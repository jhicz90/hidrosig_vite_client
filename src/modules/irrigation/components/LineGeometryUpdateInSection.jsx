import React, { useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import { InputSearch, MapLocation, OptionGeometry } from '@/components'
import { useLazyGetListLineQuery, useUpdateSectionByIdMutation } from '@/store/actions'

export const LineGeometryUpdateInSection = ({ section = null }) => {

    const [show, setShow] = useState(false)
    const [typeLocation, setTypeLocation] = useState(0)
    const [search, setSearch] = useState('')
    const [range, setRange] = useState(20)
    const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 })
    const [searchLine, { data: optionsLines = [], isFetching: isLoadingSearchLine }] = useLazyGetListLineQuery()
    const [updateSection, { isLoading: isUpdating }] = useUpdateSectionByIdMutation()

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleUpdate = (feature) => {
        updateSection({
            id: section,
            section: { feature }
        })
    }

    return (
        <React.Fragment>
            <Button
                onClick={handleShow}
                variant='primary'
            >
                Cambiar conducto
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
                        <Modal.Title>Linea geográfica #ACTUALIZAR</Modal.Title>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className='container-flex-stack'>
                        <InputSearch
                            value={search}
                            onChange={(e) => {
                                if (e.trim() !== '') searchLine(e)
                                setSearch(e)
                            }}
                            placeholder='Buscar lineas...'
                            loading={isLoadingSearchLine}
                        />
                        {
                            optionsLines.length > 0
                            &&
                            <div className='row row-cols-1 g-2'>
                                {
                                    // optionsAreas.filter(a => a._id !== feature?._id).map(area =>
                                    optionsLines.map(line =>
                                        <div key={line._id} className='col'>
                                            <Card>
                                                <div className='row g-0'>
                                                    <div className='col-4'>
                                                        {
                                                            !!line
                                                            &&
                                                            <MapLocation
                                                                className='rounded-start'
                                                                geometry={
                                                                    [
                                                                        { ...line }
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
                                                            <OptionGeometry geo={line} />
                                                            <Button
                                                                onClick={() => {
                                                                    handleUpdate(line._id)
                                                                }}
                                                                disabled={isUpdating}
                                                                size='sm'
                                                                className='mt-2 w-100'
                                                            >
                                                                Seleccionar Linea
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
