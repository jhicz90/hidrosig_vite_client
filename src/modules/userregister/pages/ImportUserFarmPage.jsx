import { Button, Card, CardGroup } from 'react-bootstrap'

export const ImportUserPage = () => {
    return (
        <CardGroup className='m-3'>
            <Card className='text-bg-primary'>
                <Card.Body>
                    <Card.Title>Exportar</Card.Title>
                    <Card.Text>Dar click para exportar canales y tramos</Card.Text>
                    <Button
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
                        variant='neutral'
                    >
                        Importar
                    </Button>
                </Card.Body>
            </Card>
        </CardGroup>
    )
}
