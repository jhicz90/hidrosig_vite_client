import { Body, Cell, Header, HeaderCell, HeaderRow, Row, Table } from '@table-library/react-table-library/table'
import { useTheme } from '@table-library/react-table-library/theme'
import { getTheme } from '@table-library/react-table-library/baseline'
import { Virtualized } from '@table-library/react-table-library/virtualized'

export const DataTable = ({ columns = [], rows = [], renderEmpty: NoResultsComponent = NoResults, className = '', style = {}, virtual = false, height = '400px' }) => {

    // * MAS ADELANTE SE IMPLEMENTARA LOS ESTILOS CON STYLED COMPONENT PARA PASAR PROPIEDADES Y TENER UN ESTILO DINAMICO
    // * TAMBIEN SE IMPLEMENTARA UN SOMBREADO O BACKGROUND ESPECIAL PARA LOS NUEVOS REGISTROS QUE APAREZCAN EN LA LISTA

    const theme = useTheme([
        getTheme(),
        virtual
            ?
            {
                HeaderCell: `
                    background-color: #fff;
                    min-height: 50px;
                `,
            }
            :
            {
                Table: `
                    height: ${height};
                    background-color: #f5f8fa;
                    grid-template-rows: 40px repeat(${rows.length}, minmax(50px, 60px));
                    --data-table-library_grid-template-columns: ${columns.map(c => {
                        if (!c.width) {
                            if (!c.minWidth) {
                                return 'minmax(200px, 1fr)'
                            } else {
                                return `minmax(${c.minWidth}, 1fr)`
                            }
                        } else {
                            return c.width
                        }
                    }).join(' ')} !important;
                `,
                HeaderCell: `
                    background-color: #fff !important;
                    max-height: 40px;

                    &.pin-right {
                        right: 0px;
                    }
                `,
                Cell: `
                    max-height: 60px;

                    &.pin-right {
                        right: 0px;
                        background-color: #f5f8fa;
                    }
                `
            }
    ])

    const data = { nodes: rows.map(r => ({ ...r, id: r._id })) }

    return (
        <div style={{ height, ...style }} className={`${virtual ? 'table-virtual' : ''}`}>
            <Table theme={theme} data={data} layout={{ fixedHeader: true, horizontalScroll: true }}>
                {
                    virtual
                        ?
                        (tableList) => (
                            <Virtualized
                                tableList={tableList}
                                rowHeight={50}
                                header={
                                    () => (
                                        <HeaderRow>
                                            {
                                                columns.map((col, index) =>
                                                    <HeaderCell key={`header_column_${index}`} resize={col.resize}>{col.label}</HeaderCell>
                                                )
                                            }
                                        </HeaderRow>
                                    )
                                }
                                body={
                                    (item, index) => (
                                        <Row key={`row_${item.id}`} item={item}>
                                            {
                                                columns.map((col, index) =>
                                                    <Cell key={`row_cell_${index}_${item.id}`}>{col.renderCell(item) || ''}</Cell>
                                                )
                                            }
                                        </Row>
                                    )
                                }
                            />
                        )
                        :
                        (tableList) => (
                            <>
                                <Header>
                                    <HeaderRow>
                                        {
                                            columns.map((col, index) =>
                                                <HeaderCell
                                                    key={`header_column_${index}`}
                                                    // resize={col.resize}
                                                    pinLeft={col.pinLeft || undefined}
                                                    pinRight={col.pinRight || undefined}
                                                >
                                                    {col.label}
                                                </HeaderCell>
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
                                                        <Cell
                                                            key={`row_cell_${index}_${item.id}`}
                                                            pinLeft={col.pinLeft || undefined}
                                                            pinRight={col.pinRight || undefined}
                                                        >
                                                            {col.renderCell(item) || ''}
                                                        </Cell>
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
        </div>
    )
}

const NoResults = () => {
    return (
        <strong className='mx-3 fs-5'>No ahi datos para mostrar</strong>
    )
}