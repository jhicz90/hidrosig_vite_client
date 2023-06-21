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
    color: rgb(107 114 128 / 1);

    &::after {
        content: "";
        flex-grow: 1;
        height: 2px;
        background: rgb(209 213 219 / 1);
        min-width: 20px;
        margin: auto;
    }

    &::after {
        margin-left: 20px;
    }
`