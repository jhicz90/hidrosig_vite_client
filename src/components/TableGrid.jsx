import { CompactTable } from '@table-library/react-table-library/compact'
import { useTheme } from '@table-library/react-table-library/theme'
import { getTheme } from '@table-library/react-table-library/baseline'

export const TableGrid = ({ columns, rows }) => {
    const theme = useTheme([
        getTheme(),
        {
            Table: `
                --data-table-library_grid-template-columns: 350px ${columns.length > 2 ? `repeat(${columns.length-2}, 300px)` : ``} 100px;
                --bs-table-bg: white;
                border-top: 1px solid rgb(221, 226, 235);
            `,
            BaseCell: `
                &:nth-of-type(${columns.length}) {
                    right: 0px;
                    z-index: 1;
                }

                padding: 9px 16px !important;
            `,
        }
    ])
    const data = { nodes: rows.map(r => ({ ...r, id: r._id })) }

    return (
        <CompactTable
            theme={theme}
            columns={columns}
            data={data}
            layout={{ custom: true, horizontalScroll: true }}
        />
    )
}
