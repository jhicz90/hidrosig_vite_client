import styled from 'styled-components'

export const DaysWeekContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 24px);
    grid-template-rows: 24px;

    & > .dayWeek {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px;
        background-color: #49525d;
        color: white;
    }
`