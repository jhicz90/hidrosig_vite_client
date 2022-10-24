import { CompactTable } from '@table-library/react-table-library/compact'
import { useTheme } from '@table-library/react-table-library/theme'
import { getTheme } from '@table-library/react-table-library/baseline'

export const TableGrid = ({ columns, rows }) => {

    console.log('COLUMNAS', columns)

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
            `,
            BaseCell: `
                ${columns[length - 1]?.pinRight === true && `
                    &:nth-of-type(${columns.length - 1}) {
                        right: 0px;
                        z-index: 1;
                    }
                `}

                padding: 9px 16px !important;
            `,
        }
    ])

    const data = { nodes: rows.map(r => ({ ...r, id: r._id })) }

    return (
        <div style={{ height: '500px' }}>
            <CompactTable
                theme={theme}
                columns={columns}
                data={data}
                layout={{ custom: true, fixedHeader: true, horizontalScroll: true }}
            />
        </div>
    )
}
