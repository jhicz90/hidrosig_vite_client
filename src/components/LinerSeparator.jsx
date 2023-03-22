import React from 'react'
import styled from 'styled-components'

export const Liner = ({ children }) => {
    return (
        <LinerWrapper>{children}</LinerWrapper>
    )
}

const LinerWrapper = styled.h5`
    display: flex;
	align-items: flex-start;
	text-align: left;

    &::after {
        content: "";
        flex-grow: 1;
        height: 1px;
        background: #0b85d6;
        min-width: 20px;
        margin: auto;
    }

    &::after {
        margin-left: 20px;
    }
`