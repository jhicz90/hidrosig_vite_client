import React from 'react'
import styled from 'styled-components'
import GridTable from '@nadavshaar/react-grid-table'

const Table = styled(GridTable)`
    border: none;
    border-top-left-radius: 9px;
    border-top-right-radius: 9px;
    overflow: hidden;
`

export const TableAdaptive = ({ columns = [], data = [], onSearchTextChange = null, emptyText = '' }) => {

    return (
        <Table
            columns={columns}
            rows={data}
            isPaginated={false}
            texts={{
                search: 'Buscar: ',
                totalRows: 'Total de registros: ',
                columnVisibility: 'Visibilidad'
            }}
            onSearchTextChange={onSearchTextChange}
            components={{ NoResults }}
        />
    )
}

const NoResults = () => {
    return (
        <h2>NO SE ENCONTRARON DATOS</h2>
    )
}