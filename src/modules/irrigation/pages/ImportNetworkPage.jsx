import { useDispatch } from 'react-redux'
import { Button, Card, CardGroup } from 'react-bootstrap'
import { startExportNet, startImportNet, startModalTempResource } from '../../../store/actions'

export const ImportNetworkPage = () => {

    const dispatch = useDispatch()

    return (
        <CardGroup className='m-3'>
            <Card className='text-bg-primary'>
                <Card.Body>
                    <Card.Title>Exportar</Card.Title>
                    <Card.Text>Dar click para exportar canales y tramos</Card.Text>
                    <Button
                        onClick={() => dispatch(startExportNet())}
                        variant='neutral'
                    >
                        Exportar
                    </Button>
                </Card.Body>
            </Card>
            <Card className='text-bg-success'>
                <Card.Body>
                    <Card.Title>Importar</Card.Title>
                    <Button
                        onClick={() => {
                            dispatch(startModalTempResource({
                                fileTypesTemp: ['.xlsx'],
                                setFilesTemp: (data) => dispatch(startImportNet(data))
                            }))
                        }}
                        variant='neutral'
                    >
                        Importar
                    </Button>
                </Card.Body>
            </Card>
        </CardGroup>
    )
}
