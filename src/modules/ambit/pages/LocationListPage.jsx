import { useState } from 'react'
import { Alert, Button, ButtonGroup } from 'react-bootstrap'
import { FaMapMarkedAlt } from 'react-icons/fa'
import { DataTable, InputSearch, LinkBack } from '../../../components'
import { useGetListLocationQuery } from '../../../store/actions'

export const LocationListPage = () => {

    const [search, setSearch] = useState('')
    const { data: list = [], isFetching } = useGetListLocationQuery(search)

    return (
        <>
            <Alert variant='info' className='m-3 mb-0'>
                <Alert.Heading>Aviso</Alert.Heading>
                <p>
                    La informacion que se lista a continuación provienen de la base de datos públicos del gobierno peruano si deseas revisarlo entra en el siguiente <a href='https://github.com/jmcastagnetto/ubigeo-peru-aumentado' target='_blank'>ENLACE</a>.
                    Toda modificacion se vera reflejada en esta lista, si deseas verficar algun dato solo buscalo, por consiguiente si estos
                    están enlazados a un registro que use LOCALIDAD, como los PREDIOS si necesita ser actualizado da click en el boton ACTUALIZAR DATOS,
                    y se actualizaran todos los registros enlazado a esta LOCALIDAD.
                </p>
                <hr />
                <p className='mb-0'>
                    Si ahi datos extraños o que no concuerdan con lo que deberian mostrar por favor comunicate con el administrador.
                    RECORDAR: ESTOS DATOS NO PUEDEN MODIFICARSE, SOLO SON DE LECTURA
                </p>
            </Alert>
            <InputSearch value={search} onChange={(e) => setSearch(e)} loading={isFetching} />
            <DataTable
                virtual={true}
                rows={list}
                columns={
                    [
                        {
                            label: 'INEI',
                            renderCell: (item) => (
                                item.inei
                            )
                        },
                        {
                            label: 'RENIEC',
                            renderCell: (item) => (
                                item.reniec
                            )
                        },
                        {
                            label: 'DEPARTAMENTO',
                            renderCell: (item) =>
                                item.departamento
                        },
                        {
                            label: 'PROVINCIA',
                            renderCell: (item) => (
                                item.provincia
                            )
                        },
                        {
                            label: 'REGION',
                            renderCell: (item) => (
                                item.region
                            )
                        },
                        {
                            label: 'CAPITAL',
                            renderCell: (item) => (
                                item.capital
                            )
                        },
                        {
                            label: 'ACCIÓN',
                            pinRight: true,
                            renderCell: (item) =>
                                <ButtonGroup>
                                    <LinkBack
                                        className='btn btn-neutral'
                                        to={`?w=geopos_go&lat=${item.latitude}&lon=${item.longitude}`}
                                    >
                                        <FaMapMarkedAlt />
                                    </LinkBack>
                                    <Button
                                        variant='primary'
                                    >
                                        Actualizar datos
                                    </Button>
                                </ButtonGroup>
                        }
                    ]
                }
            />
        </>
    )
}
