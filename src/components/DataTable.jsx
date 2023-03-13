import { Body, Cell, Header, HeaderCell, HeaderRow, Row, Table } from '@table-library/react-table-library/table'
import { useTheme } from '@table-library/react-table-library/theme'
import { getTheme } from '@table-library/react-table-library/baseline'

export const DataTable = ({ columns = [], rows, renderEmpty: NoResultsComponent = NoResults, className = '', style = {} }) => {

    // * MAS ADELANTE SE IMPLEMENTARA LOS ESTILOS CON STYLED COMPONENT PARA PASAR PROPIEDADES Y TENER UN ESTILO DINAMICO
    // * TAMBIEN SE IMPLEMENTARA UN SOMBREADO O BACKGROUND ESPECIAL PARA LOS NUEVOS REGISTROS QUE APAREZCAN EN LA LISTA

    const theme = useTheme([
        getTheme(),
        {
            HeaderCell: `
                background-color: white;
            `
        }
    ])

    const data = { nodes: rows.map(r => ({ ...r, id: r._id })) }

    return (
        <Table theme={theme} data={data}>
            {
                (tableList) => (
                    <>
                        <Header>
                            <HeaderRow>
                                {
                                    columns.map((col, index) =>
                                        <HeaderCell key={`header_column_${index}`} resize={col.resize}>{col.label}</HeaderCell>
                                    )
                                }
                            </HeaderRow>
                        </Header>
                        <Body>
                            {
                                tableList.map((item) => (
                                    <Row key={`row_${item.id}`} item={item}>
                                        {
                                            columns.map((col, index) =>
                                                <Cell key={`row_cell_${index}_${item.id}`}>{col.renderCell(item) || ''}</Cell>
                                            )
                                        }
                                    </Row>
                                ))
                            }
                        </Body>
                    </>
                )
            }
        </Table>
    )
}

const NoResults = () => {
    return (
        <strong className='mx-3 fs-5'>No ahi datos para mostrar</strong>
    )
}