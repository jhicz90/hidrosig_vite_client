import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button, Card } from 'react-bootstrap'
import { DataTable, LinkBack } from '../../../components'
import { farmApi } from '../../../store/actions'

export const AreaFarmWaterIn = () => {

    const { prpid } = useParams()
    const { data = null } = useSelector(farmApi.endpoints.getFarmById.select(prpid))

    return (
        <Card className='overflow-hidden'>
            <div className='row p-3'>
                <div className='col-auto'>
                    <LinkBack
                        className='btn btn-neutral text-primary'
                        to={`?w=areafarm_create_waterin`}
                        state={{ farm: data || '' }}
                    >
                        Agregar tramo
                    </LinkBack>
                </div>
            </div>
            <DataTable
                rows={data.inputIrrig}
                columns={
                    [
                        {
                            label: 'ORDEN',
                            minWidth: '50px',
                            renderCell: (item) => (
                                item.order
                            )
                        },
                        {
                            label: 'AREA DE RIEGO',
                            minWidth: '50px',
                            renderCell: (item) => (
                                item.areaUse
                            )
                        },
                        {
                            label: 'SISTEMA DE RIEGO',
                            minWidth: '50px',
                            renderCell: (item) => (
                                item.irrigSystem.name
                            )
                        },
                        {
                            label: 'VOLUMEN',
                            minWidth: '50px',
                            renderCell: (item) => (
                                <strong>{Number(item.regulation)}</strong>
                            )
                        },
                        {
                            label: 'ACCIÓN',
                            pinRight: true,
                            renderCell: (item) =>
                                <Button>Editar</Button>
                        }
                    ]
                }
            />
        </Card>
    )
}