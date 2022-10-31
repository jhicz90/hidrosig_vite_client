import { CompactTable } from '@table-library/react-table-library/compact'
import { useTheme } from '@table-library/react-table-library/theme'
import { getTheme } from '@table-library/react-table-library/baseline'

export const TableGrid = ({ columns, rows, renderEmpty: NoResultsComponent = NoResults, className = '', style = {} }) => {
    const theme = useTheme([
        getTheme(),
        {
            Table: `
                --data-table-library_grid-template-columns: ${columns.map(c => {
                if (!c.width) {
                    return 'minmax(150px, auto)'
                } else {
                    return c.width
                }
            }).join(' ')};
                --bs-table-bg: white;
                border-top: 1px solid rgb(221, 226, 235);
                grid-template-rows: 50px ${rows.length > 0 ? `repeat(${rows.length}, minmax(50px, 60px))` : ''};
            `,
            BaseCell: `
                ${columns.map((c, i) => {
                if (!c.pinRight) {
                    return ''
                } else {
                    return `
                        &:nth-of-type(${i + 1}) {
                            right: 0px;
                            background-color: white;
                        }`
                }
            })}

                padding: 9px 16px !important;
            `,
            HeaderCell: `
                background-color: white !important;
            `
        }
    ])

    const data = { nodes: rows.map(r => ({ ...r, id: r._id })) }

    return (
        <div className={className} style={{ height: '400px', overflow: 'hidden', ...style }}>
            {
                rows.length > 0
                    ?
                    <CompactTable
                        theme={theme}
                        columns={columns}
                        data={data}
                        layout={{
                            custom: true,
                            fixedHeader: true,
                            isDiv: true,
                            horizontalScroll: true
                        }}
                    />
                    :
                    <div
                        className='d-flex'
                        style={{
                            height: '100%',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <NoResultsComponent />
                    </div>
            }
        </div>
    )
}

const NoResults = () => {
    return (
        <strong className='mx-3 fs-5'>No ahi datos para mostrar</strong>
    )
}