import { Card } from 'react-bootstrap'
import styled from 'styled-components'

export const CardHeaderStyled = styled(Card.Header)`
    background-color: white;
    padding: 1rem;

    & > div.card-header-wrapper {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;

        & > div.card-header-tittle {
            & > h3 {
                color: rgb(17 24 39 / 1);
                line-height: 1.5rem;
                font-weight: 600;
                font-size: 1.25rem;
                margin-bottom: 0;
            }
        }

        & > div.card-header-actions {
            display: flex;
            flex-direction: row;
            gap: 8px;
            flex-wrap: wrap;
            flex-shrink: 1;
        }
    }
`