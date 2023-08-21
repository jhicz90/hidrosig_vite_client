import React from 'react'
import { Container } from 'react-bootstrap'

export const ContainerController = ({ children }) => {
    return (
        <Container fluid>
            {children}
        </Container>
    )
}
