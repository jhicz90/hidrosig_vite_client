import styled from 'styled-components'

export const HeaderGrid = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: darkgray;
    text-align: center;
    font-weight: bold;
    padding: 4px;
`

export const CellRow = styled.div`
    display: contents;

    &:hover > div {
        cursor: pointer;
        font-weight: bold;
        background-color: #f8f9fa;
    }
`

export const CellGrid = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${props => props.isNumber ? 'flex-end' : 'flex-start'};
    text-align: ${props => props.isNumber ? 'right' : 'left'};
    padding: 0 4px;
    /* border-left: 1px solid black;
    border-right: 1px solid black; */
`