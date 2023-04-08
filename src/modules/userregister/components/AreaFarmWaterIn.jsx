import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Card, Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap'
import { DataTable } from '../../../components'
import { useLazyGetListWaterInForAreaQuery } from '../../../store/actions'
import { FaSearchLocation } from 'react-icons/fa'

export const AreaFarmWaterIn = () => {

    const { prpid } = useParams()
    const [rangeSearch, setRangeSearch] = useState(200)
    const [loadWaterIn, { data: watersIn = [], isLoading }] = useLazyGetListWaterInForAreaQuery()

    return (
        <Card className='overflow-hidden'>
            <div className='row p-3'>
                <div className='col-auto'>
                    <InputGroup>
                        <Button
                            onClick={() => loadWaterIn({ id: prpid, range: rangeSearch })}
                            className='d-flex align-items-center gap-2'
                        >
                            <FaSearchLocation size={24} />
                            Tomas cercanas
                        </Button>
                        <DropdownButton>
                            <Dropdown.ItemText>
                                <Form.Group controlId='pLongSearch'>
                                    <Form.Label>Distancia (metros)</Form.Label>
                                    <Form.Control
                                        value={rangeSearch}
                                        onChange={(e) => setRangeSearch(e.target.value)}
                                        type='number'
                                    />
                                </Form.Group>
                            </Dropdown.ItemText>
                        </DropdownButton>
                    </InputGroup>
                </div>
            </div>
            <DataTable
                rows={watersIn}
                columns={
                    [
                        {
                            label: 'CANAL',
                            minWidth: '250px',
                            renderCell: (item) => (
                                item.structure.name
                            )
                        },
                        {
                            label: 'TRAMO',
                            minWidth: '250px',
                            renderCell: (item) =>
                                <p className='text-wrap m-0' style={{ fontSize: '0.75rem', width: '250px' }}>{item.name}</p>
                        },
                        {
                            label: 'PROGRESIVA',
                            minWidth: '250px',
                            renderCell: (item) =>
                                <p className='text-muted m-0'>{`${item.progressiveStart} - ${item.progressiveEnd}`}</p>
                        },
                        {
                            label: 'ACCIÓN',
                            pinRight: true,
                            renderCell: (item) =>
                                <>Opciones de elegir el tramo</>
                        }
                    ]
                }
            />
        </Card>
    )
}
