import styled from 'styled-components'

export const DaysMonthContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 24px);
    grid-template-rows: 24px;

    & > .dayMonth {
        padding: 5px;
        font-size: 12px;
        width: 24px;
        height: 24px;
        font-weight: bold;
        user-select: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;

        &.dayEmpty {
            cursor: default;
        }

        &:hover:not(.dayEmpty) {
            background-color: #9aa3af;
            color: white;

            &.dayVolume {
                background-color: var(--bs-primary);
            }
        }
        
        &.daySunday {
            background-color: #e2e5e9;
        }
        
        &.dayVolume {
            background-color: rgb(var(--bs-primary-rgb), 0.75);
            color: white;
        }
    }
`