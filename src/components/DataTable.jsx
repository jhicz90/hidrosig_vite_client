import { Body, Cell, Header, HeaderCell, HeaderRow, Row, Table } from '@table-library/react-table-library/table'
import { useTheme } from '@table-library/react-table-library/theme'
import { getTheme } from '@table-library/react-table-library/baseline'
import { Virtualized } from '@table-library/react-table-library/virtualized'
import { HeaderCellSelect, CellSelect, SelectClickTypes, SelectTypes, useRowSelect } from '@table-library/react-table-library/select'

export const DataTable = ({
    columns = [],
    rows = [],
    renderEmpty: NoResultsComponent = NoResults,
    className = '',
    style = {},
    virtual = false,
    height = '400px',
    selected = false,
    selectedChange = null
}) => {

    // * MAS ADELANTE SE IMPLEMENTARA LOS ESTILOS CON STYLED COMPONENT PARA PASAR PROPIEDADES Y TENER UN ESTILO DINAMICO
    // * TAMBIEN SE IMPLEMENTARA UN SOMBREADO O BACKGROUND ESPECIAL PARA LOS NUEVOS REGISTROS QUE APAREZCAN EN LA LISTA

    const columnsTable = columns.filter(c => typeof c === 'object')

    const theme = useTheme([
        getTheme(),
        virtual
            ?
            {
                Table: `
                    display: flex;
                    --data-table-library_grid-template-columns:${selected ? ' 50px' : ''} ${columnsTable.map(c => {
                    if (!c.width) {
                        if (!c.minWidth) {
                            return 'minmax(140px, 1fr)'
                        } else {
                            return `minmax(${c.minWidth}, 1fr)`
                        }
                    } else {
                        return c.width
                    }
                }).join(' ')} !important;
                `,
                HeaderCell: `
                    background-color: #fff;
                    min-height: 50px;
                `,
                Cell: `
                    padding: 0px 16px;
                `
            }
            :
            {
                Table: `
                    height: ${height};
                    background-color: #f5f8fa;
                    grid-template-rows: 40px repeat(${rows.length}, minmax(50px, 60px));
                    --data-table-library_grid-template-columns:${selected ? ' 50px' : ''} ${columnsTable.map(c => {
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

                    &.stiff > div {
                        display: flex;
                    }

                    &.stiff input[type='checkbox'] {
                        width: 25px;
                        height: 25px;
                    }

                    &.pin-right {
                        right: 0px;

                        &:before {
                            content: "";
                            position: absolute;
                            bottom: 0;
                            left: -20px;
                            top: 0;
                            width: 20px;
                            box-shadow: inset -10px 0 8px -8px rgba(0,0,0,0.4);
                            background-color: white;
                        }
                    }
                `,
                Row: `
                    &.row-select-clickable { 
                        cursor: default;
                    }
                `,
                Cell: `
                    max-height: 60px;

                    &.stiff > div {
                        display: flex;
                    }

                    &.stiff input[type='checkbox'] {
                        width: 25px;
                        height: 25px;
                    }

                    &.pin-right {
                        right: 0px;
                        background-color: #f5f8fa;

                        &:before {
                            content: "";
                            position: absolute;
                            bottom: 0;
                            left: -20px;
                            top: 0;
                            width: 20px;
                            box-shadow: inset -10px 0 8px -8px rgba(0,0,0,0.4);
                            height: calc(100% + 1px)
                        }
                    }
                `
            }
    ])

    const data = { nodes: rows.map(r => ({ ...r, id: r._id })) }

    const onSelectChange = (action, state) => {
        selectedChange(state.ids)
    }

    const select = useRowSelect(data, {
        onChange: onSelectChange,
    }, {
        clickType: SelectClickTypes.ButtonClick,
    })

    return (
        <div style={{ height, ...style }} className={`${virtual ? 'table-virtual' : ''}`}>
            <Table theme={theme} data={data} layout={{ fixedHeader: true, horizontalScroll: true }} select={selected ? select : null}>
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
                                                columnsTable.map((col, index) =>
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
                                                columnsTable.map((col, index) =>
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
                                            selected
                                            &&
                                            <HeaderCellSelect />
                                        }
                                        {
                                            columnsTable.map((col, index) =>
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
                                                    selected
                                                    &&
                                                    <CellSelect item={item} />
                                                }
                                                {
                                                    columnsTable.map((col, index) =>
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