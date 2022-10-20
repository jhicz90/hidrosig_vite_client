import React from 'react'
import styled from 'styled-components'

export const ListInline = ({ children }) => {
    return (
        <ListInlineStyled>{children}</ListInlineStyled>
    )
}

const ListInlineStyled = styled.ul`
    padding: 4px;
    list-style: none;
    margin: 0;

    & li {
        display: inline-block;
    }

    & li:not(:first-child),
    & li:not(:last-child) {
        padding-right: 1rem;
    }

    & li:not(:last-child) {
        margin-right: 0.25rem;
    }
`