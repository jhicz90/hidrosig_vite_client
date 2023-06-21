import { Body, Cell, Footer, FooterCell, FooterRow, Header, HeaderCell, HeaderRow, Row, Table } from '@table-library/react-table-library/table'
import { useTheme } from '@table-library/react-table-library/theme'
import { getTheme } from '@table-library/react-table-library/baseline'
import { Virtualized } from '@table-library/react-table-library/virtualized'
import { HeaderCellSelect, CellSelect, SelectClickTypes, useRowSelect } from '@table-library/react-table-library/select'

export const DataTable = ({
    columns = [],
    rows = [],
    renderEmpty: NoResultsComponent = NoResults,
    className = '',
    style = {},
    virtual = false,
    height = '400px',
    selected = false,
    selectedChange = null,
    footer = false,
    maxHeightHeaderRow = '40px',
    minHeightRowCell = '50px',
    maxHeightRowCell = '60px'
}) => {

    // * MAS ADELANTE SE IMPLEMENTARA LOS ESTILOS CON STYLED COMPONENT PARA PASAR PROPIEDADES Y TENER UN ESTILO DINAMICO
    // * TAMBIEN SE IMPLEMENTARA UN SOMBREADO O BACKGROUND ESPECIAL PARA LOS NUEVOS REGISTROS QUE APAREZCAN EN LA LISTA

    let subTotal = 0

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
                    height: 100%;
                    margin: 0;
                    background-color: #f5f8fa;
                    border-radius: 9px;
                    grid-template-rows: ${maxHeightHeaderRow} repeat(${rows.length}, minmax(${minHeightRowCell}, ${maxHeightRowCell}));
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
                    max-height: ${maxHeightHeaderRow};

                    & > div {
                        overflow: auto;
                        white-space: inherit;
                        text-overflow: inherit;
                    }

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
                            background-color: transparent;
                        }
                    }
                `,
                HeaderRow: `
                    font-size: inherit;
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
        <div style={{ height, overflow: 'hidden', borderRadius: '9px', ...style }} className={`${virtual ? 'table-virtual' : ''}`}>
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
                                                    className={col.isNumber ? `text-end` : ``}
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
                                                            className={col.isNumber ? `text-end` : ``}
                                                        >
                                                            {col.renderCell(item) || ''}
                                                        </Cell>
                                                    )
                                                }
                                            </Row>
                                        ))
                                    }
                                </Body>
                                {
                                    footer
                                    &&
                                    <Footer>
                                        <FooterRow>
                                            {
                                                columnsTable.map((col, index) =>
                                                    <FooterCell
                                                        key={`footer_column_${index}`}
                                                        // resize={col.resize}
                                                        pinLeft={col.pinLeft || undefined}
                                                        pinRight={col.pinRight || undefined}
                                                    >
                                                        <CellSubTotal column={col} list={tableList} />
                                                    </FooterCell>
                                                )
                                            }
                                        </FooterRow>
                                    </Footer>
                                }
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

const CellSubTotal = ({ column, list }) => {

    let subTotal = 0

    return (
        <>
            {
                column.hasOwnProperty('subTotal')
                    ?
                    <>
                        {
                            list.forEach(item => {
                                subTotal = subTotal + Number(column.renderCell(item))
                            })
                        }
                        {subTotal.toFixed(5)}
                    </>
                    :
                    <>
                        {column.label}
                    </>
            }
        </>
    )
}