import React from 'react'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'

export const ButtonIcon = (props) => {
    return (
        <ButtonWithIcon {...props}>{props.children}</ButtonWithIcon>
    )
}

const ButtonWithIcon = styled(Button)`
    display: flex;
    align-items: center;
`