import React from 'react'
import moment from 'moment'
import styled from 'styled-components'

export const MonthName = ({ monthIndex }) => {
    return <MonthNameStyle>{moment().month(monthIndex).format('MMMM').toUpperCase()}</MonthNameStyle>
}

const MonthNameStyle = styled.b`
    display: flex;
    justify-content: center;
    background-color: #49525d;
    padding: 5px 0;
    font-size: 12px;
    color: white;
`